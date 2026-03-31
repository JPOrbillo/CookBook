import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform(({ value }) => {
    return value.trim();
  })
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, { message: 'Password too short (minimum 5 characters)' })
  password: string;

  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;

  @IsNotEmpty()
  @IsString()
  @IsDateString()
  birthdate: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  contact?: string;
}
