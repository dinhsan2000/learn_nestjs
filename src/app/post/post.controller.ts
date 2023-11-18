import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import {PostService} from './post.service';
import {CreatePostDto} from './dto/create-post.dto';
import {UpdatePostDto} from './dto/update-post.dto';
import {AuthGuard} from "../auth/auth.guard";
import {Request} from "express";

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Post()
  @UseGuards(AuthGuard)
  async create(@Body() createPostDto: CreatePostDto, @Req() request: Request) {
    const post = await this.postService.create(createPostDto, request['user'].uuid);
    return ({
      'data': post,
      'message': 'Post created successfully',
      'status': 'success'
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  async findAll() {
    const post = await this.postService.findAll();
    return ({
      'data': post,
      'message': 'Posts retrieved successfully',
      'status': 'success'
    });
  }

  @Get(':uuid')
  @UseGuards(AuthGuard)
  async findOne(@Param('uuid') uuid: string) {
    const post = await this.postService.findOne(uuid);
    return ({
      'data': post,
      'message': 'Post retrieved successfully',
      'status': 'success'
    });
  }

  @Patch(':uuid')
  @UseGuards(AuthGuard)
  async update(@Param('uuid') uuid: string, @Body() updatePostDto: UpdatePostDto, @Req() request: Request) {
    const post = await this.postService
      .update(uuid, updatePostDto, request['user'].uuid);

    return ({
      'data': post,
      'message': 'Post updated successfully',
      'status': 'success'
    });
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  remove(@Param('uuid') uuid: string) {
    return this.postService.remove(String(+uuid));
  }
}
