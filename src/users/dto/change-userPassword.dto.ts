import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
export class ChangeUserPasswordDto {
  @IsString()
  @IsOptional()
  @MinLength(6)
  id?: string;

  @IsString()
  @IsOptional()
  @MinLength(6)
  username?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
