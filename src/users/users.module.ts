import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserProfile } from './entities/user-profile.entity';
import { UserPosts } from './entities/user_posts.entity';
import { SavedRecipes } from './entities/saved_recipes.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserProfile, UserPosts, SavedRecipes]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
