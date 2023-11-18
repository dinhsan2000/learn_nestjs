import {Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import {AuthService} from './auth.service';
import {CreateAuthDto} from './dto/create-auth.dto';
import {LoginAuthDto} from "./dto/login-auth.dto";
import {UserEntity} from "../user/entities/user.entity";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('register')
  async create(@Body() createAuthDto: CreateAuthDto) {
    const user = await this.authService.create(createAuthDto);
    return ({
      'data': user,
      'message': 'User created successfully',
      'status': 'success'
    });
  }

  @Post('login')
  async login(@Body() createAuthDto: LoginAuthDto) {
    const user = await this.authService.login(createAuthDto);
    return ({
      'data': user,
      'message': 'User logged in successfully',
      'status': 'success'
    });
  }

  @Post('refresh-token')
  async refreshToken(@Body() {refresh_token}: { refresh_token: string }, res: Response) {
    const user = await this.authService.refreshToken(refresh_token);
    return ({
      'data': user,
      'message': 'Token refreshed successfully',
      'status': 'success'
    });

  }
}
