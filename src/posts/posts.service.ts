import { Injectable, NotFoundException } from '@nestjs/common';
import { updatePosts } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPosts } from './entities/post.entity';
import { Repository } from 'typeorm';
import { createPosts } from './dto/createPosts.dto';
import { UserProfile } from 'src/users/entities/user-profile.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(UserPosts)
    private userPostRepo: Repository<UserPosts>,
    @InjectRepository(UserProfile)
    private userProfileRepo: Repository<UserProfile>,
  ) {}

  async createPost(createPostDto: createPosts, userID: string) {
    const foundUser = await this.userProfileRepo.findOne({
      where: { userProfile: { id: userID } },
      relations: {
        posts: true,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    const postRecipe = this.userPostRepo.create({
      ...createPostDto,
    });
    const postedRecipe = await this.userPostRepo.save(postRecipe);

    foundUser.posts.push(postedRecipe);
    await this.userProfileRepo.save(foundUser);

    return postedRecipe;
  }

  async savePost(userID: string) {
    const foundUser = await this.userProfileRepo.findOne({
      where: { userProfile: { id: userID } },
      relations: {
        posts: true,
      },
    });

    if (!foundUser) {
      throw new NotFoundException('User does not exist');
    }

    return;
  }

  findAll() {
    return `This action returns all posts`;
  }

  update(id: number, updatePostDto: updatePosts) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
