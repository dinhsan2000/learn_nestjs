import {IsEmail, IsNotEmpty} from "class-validator";

export class CreateAuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
