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
    @InjectRepository(UserProfile)
    private userProfileRepo: Repository<UserProfile>,
    @InjectRepository(UserPosts)
    private userPostRepo: Repository<UserPosts>,
  ) {}

  async createPost(createPostDto: createPosts, userID: string) {
    const user = await this.userProfileRepo.findOne({ where: { id: userID } });

    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    const postRecipe = this.userPostRepo.create({
      ...createPostDto,
    });

    await this.userPostRepo.save(postRecipe);

    const { ...saveRescpe } = user;
    return saveRescpe;
  }

  findAll() {
    return `This action returns all posts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} post`;
  }

  update(id: number, updatePostDto: updatePosts) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
