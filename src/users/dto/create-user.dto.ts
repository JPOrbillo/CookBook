import { IsString, IsNotEmpty, MinLength, IsEmail, IsOptional, IsDateString, IsMobilePhone } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateUserDto {

    @Transform(({value}) => {
        return value.trim()
    })
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

    @IsString()
    @IsOptional()
    @IsDateString()
    birthdate: string

    //This formats the number for consistency
    //ex: if the user was able to somehow sent a number "09243124512A" it removes "A" to not crash the backend
    //the IsMobilePhone Decorator checks the length for each country codes that was specified
    @IsOptional()
    @Transform(({ value }) =>{
        if (typeof value !== 'string') return value;
        return value.trim().replace(/[^0-9+]/g,'');
    })
    @IsString()
    @IsMobilePhone(['en-PH','en-US'] as any)
    contact: string

}
