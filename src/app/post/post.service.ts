import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import {PaginationParam} from "../../common/constants";
import {IPaginationMeta, IPaginationOptions, paginate, Pagination} from "nestjs-typeorm-paginate";

const slugify = require('slugify');

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(
    createPostDto: CreatePostDto,
    userUuid: string,
    fileName: string,
  ) {
    const user = await this.userRepository.findOne({
      where: { uuid: userUuid },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const post = this.postRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
      isPublished: createPostDto.isPublished,
      user: user,
      slug: slugify(createPostDto.title, { lower: true }, '_'),
      thumbnail: fileName,
    });
    await this.postRepository.save(post);
    return post;
  }

  async findAll(options: IPaginationOptions, search): Promise<Pagination<PostEntity>> {
    let offset = 0 || PaginationParam.DEFAULT_OFFSET;
    let limit = 10 || PaginationParam.DEFAULT_LIMIT;
    return paginate<PostEntity>(this.postRepository, options, {
      where: {
        isPublished: true,
        title: search || null,
      }
    })
  }

  async findOne(uuid: string): Promise<PostEntity> {
    return await this.postRepository.findOne({
      where: { uuid: uuid },
      relations: ['user'],
    });
  }

  async update(
    uuid: string,
    updatePostDto: UpdatePostDto,
    userUuid: string,
  ): Promise<PostEntity> {
    const post = await this.postRepository.findOne({
      where: { uuid: uuid },
    });

    if (!post) {
      throw new HttpException('Post not found', 404);
    }
    const user = await this.userRepository.findOne({
      where: { uuid: userUuid },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    await this.postRepository.update(
      {
        uuid: uuid,
      },
      {
        title: updatePostDto.title,
        content: updatePostDto.content,
        isPublished: updatePostDto.isPublished,
        slug: slugify(updatePostDto.title, { lower: true }, '_'),
        user: user,
      },
    );

    return await this.postRepository.findOne({
      where: { uuid: uuid },
    });
  }

  async remove(uuid: string) {
    const post = await this.postRepository.findOne({
      where: { uuid: uuid },
    });

    if (!post) {
      throw new HttpException('Post not found', 404);
    }

    await this.postRepository.delete({
      uuid: uuid,
    });
    return;
  }
}
