import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create.user.dto';
import { json, response } from 'express';

@Controller()
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  @UseGuards()
  async index() {
    return {
      data: await this.UserService.get(),
      message: 'User has been successfully retrieved',
      status: 'success',
    };
  }

  @Post()
  async create(data: CreateUserDto) {
    return response
      .json({
        status: 'success',
        data: await this.UserService.create(data),
        message: 'User has been created successfully',
      })
      .status(201);
  }
}
