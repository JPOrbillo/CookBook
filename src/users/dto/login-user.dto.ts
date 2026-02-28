import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class logInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
