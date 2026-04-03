import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UserPosts } from 'src/posts/entities/post.entity';
import { SavedRecipes } from '../posts/entities/saved_recipes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserPosts, SavedRecipes, UserProfile]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
