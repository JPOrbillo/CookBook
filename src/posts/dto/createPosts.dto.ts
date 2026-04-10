import { IsNotEmpty, IsString } from 'class-validator';
export class createPosts {
  @IsString()
  @IsNotEmpty()
  dish_name!: string;

  @IsString()
  @IsNotEmpty()
  recipe!: string;
}
