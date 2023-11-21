import { IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  isPublished: boolean;

  image: Express.Multer.File;

  @IsNotEmpty()
  meta_key: string;

  @IsNotEmpty()
  meta_description: string;
}
