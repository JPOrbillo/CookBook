import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserPosts } from './entities/post.entity';
import { UserProfile } from 'src/users/entities/user-profile.entity';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserPosts, UserProfile, User])],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
