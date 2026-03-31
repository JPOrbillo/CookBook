import { IsNotEmpty, IsString } from 'class-validator';
export class userPostDto {
  @IsString()
  @IsNotEmpty()
  dishname: string;

  @IsString()
  @IsNotEmpty()
  recipe: string;
}
