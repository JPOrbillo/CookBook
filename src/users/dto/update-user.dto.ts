import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsOptional,
  IsDateString,
  IsMobilePhone,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsEmail()
  username?: string;

  @IsString()
  @IsOptional()
  @MinLength(5, { message: 'Password too short (minimum 5 characters)' })
  password?: string;

  @IsString()
  @IsOptional()
  firstname?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsString()
  @IsOptional()
  @IsDateString()
  birthdate?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsString()
  @IsOptional()
  @IsMobilePhone(['en-PH', 'en-US'] as any)
  contact?: string;
}
