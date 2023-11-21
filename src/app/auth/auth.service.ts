import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { UserEntity } from '../user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<UserEntity> {
    const checkUser = await this.userRepository.findOne({
      where: { email: createAuthDto.email },
    });

    if (checkUser) {
      throw new HttpException('User already exists', 400);
    }

    const hashedPassword = await this.hashPassword(createAuthDto.password);
    const newUser = this.userRepository.create({
      ...createAuthDto,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    return await this.userRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['uuid', 'name', 'email', 'created_at', 'updated_at'],
    });
  }

  async login(
    createAuthDto: LoginAuthDto,
  ): Promise<{ accessToken: string; user: UserEntity; refreshToken: string }> {
    const checkUser: UserEntity = await this.userRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['password'],
    });
    if (!checkUser) {
      throw new HttpException('User not found', 404);
    }

    const checkPassword = await bcrypt.compare(
      createAuthDto.password,
      checkUser.password,
    );

    if (!checkPassword) {
      throw new HttpException('Wrong password', 400);
    }

    const user: UserEntity = await this.userRepository.findOne({
      where: { email: createAuthDto.email },
      select: ['uuid', 'name', 'email', 'created_at', 'updated_at'],
    });

    return {
      user: user,
      ...(await this.generateJwtToken({ email: user.email, uuid: user.uuid })),
    };
  }

  async refreshToken(refresh_token: string) {
    const verify = await this.jwtService.verifyAsync(refresh_token);

    if (!verify) {
      throw new HttpException('Invalid token', 400);
    }

    const user = await this.userRepository.findOne({
      where: { email: verify.email },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return {
      user: user,
      ...(await this.generateJwtToken({ email: user.email, uuid: user.uuid })),
    };
  }

  private async generateJwtToken(payload: { email: string; uuid: string }) {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload);
    return { accessToken, refreshToken };
  }

  private async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }
}
