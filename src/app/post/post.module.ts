import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { PostEntity } from './entities/post.entity';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    TypeOrmModule.forFeature([UserEntity, PostEntity]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
