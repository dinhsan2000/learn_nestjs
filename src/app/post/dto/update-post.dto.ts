import {PartialType} from '@nestjs/mapped-types';
import {CreatePostDto} from './create-post.dto';
import {IsBoolean, IsNotEmpty, IsString} from "class-validator";

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsBoolean()
  isPublished: boolean;
}
