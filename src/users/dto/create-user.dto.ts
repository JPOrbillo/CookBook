import { IsString, IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(5, {message:"Password too short (minimum 5 characters)"})
    password: string;

    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    @IsNotEmpty()
    lastname:string;
}
