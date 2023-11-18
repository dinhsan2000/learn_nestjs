import {Body, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {UserEntity} from "./entities/user.entity";
import {Repository} from "typeorm";
import {CreateUserDto} from "./dto/create.user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {
  }


  async get(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log(createUserDto)
    return this.userRepository.create(createUserDto);
  }

  async findByEmail(email: string): Promise<UserEntity[]> {
    // @ts-ignore
    return this.userRepository.find('email', email);
  }
}
