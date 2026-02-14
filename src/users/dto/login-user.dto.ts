import { IsString, IsNotEmpty, MinLength, IsEmail, isEmail, isString } from 'class-validator';

export class signInDto{
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}