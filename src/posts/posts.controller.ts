import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';

import { createPosts } from './dto/createPosts.dto';
import { PostsService } from './posts.service';
import { updatePosts } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/resources/guards/jwt.auth-guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post('postRecipe')
  create(@Body() createPostDto: createPosts, @Request() req: any) {
    return this.postsService.createPost(createPostDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: updatePosts) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
