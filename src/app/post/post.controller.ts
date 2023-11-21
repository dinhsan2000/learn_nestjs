import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UseInterceptors,
  UploadedFile, Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from '../auth/auth.guard';
import { request, Request } from 'express';
import { multerOptions } from '../../common/storages/storage';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { PaginationParam } from '../../common/constants';
const multerConfig: MulterOptions = multerOptions;

@Controller()
@UseGuards(AuthGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async findAll(
    @Query('page') page: number = PaginationParam.DEFAULT_PAGE,
    @Query('limit') limit: number = PaginationParam.DEFAULT_LIMIT,
    @Query('search') search: string = null,
  ) {
    limit = limit > 100 ? 100 : limit;

    const post = await this.postService.findAll({
      page,
      limit,
      route: 'http://localhost:3000/posts',
    }, search);
    return {
      data: post,
      message: 'Posts retrieved successfully',
      status: 'success',
    };
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  async create(
    @Body() createPostDto: CreatePostDto,
    @Req() request: Request,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<any> {
    const fileName = file.filename;
    const post = await this.postService.create(
      createPostDto,
      request['user'].uuid,
      fileName,
    );
    return {
      data: post,
      message: 'Post created successfully',
      status: 'success',
    };
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const post = await this.postService.findOne(uuid);
    return {
      data: post,
      message: 'Post retrieved successfully',
      status: 'success',
    };
  }

  @Patch(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() request: Request,
  ) {
    const post = await this.postService.update(
      uuid,
      updatePostDto,
      request['user'].uuid,
    );

    return {
      data: post,
      message: 'Post updated successfully',
      status: 'success',
    };
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.postService.remove(uuid);
    return {
      message: 'Post deleted successfully',
      status: 'success',
    };
  }
}
