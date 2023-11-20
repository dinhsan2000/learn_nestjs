import {IsNotEmpty} from "class-validator";
import {ParseFilePipe, ParseFilePipeBuilder, UploadedFile} from "@nestjs/common";

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  isPublished: boolean;
}
