import { IsNotEmpty, IsString } from 'class-validator';
export class createPosts {
  @IsString()
  @IsNotEmpty()
  dishname!: string;

  @IsString()
  @IsNotEmpty()
  recipe!: string;
}
