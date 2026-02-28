import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
  IsDateString,
  IsMobilePhone,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @Transform(({ value }) => {
    return value.trim();
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Password too short (minimum 5 characters)' })
  password: string;

  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsOptional()
  @IsDateString()
  birthdate: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsOptional()
  @IsString()
  @IsMobilePhone(['en-PH', 'en-US'] as any)
  contact: string;
}
