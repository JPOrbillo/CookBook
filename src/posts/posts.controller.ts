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
import { GoogleAuthGuard } from 'src/resources/guards/google.auth-guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('postRecipe')
  create(@Body() createPostDto: createPosts, @Request() req: any) {
    console.log(createPostDto);
    return this.postsService.createPost(createPostDto, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('savePost')
  savePost(@Request() req: any) {
    return this.postsService.savePost(req.user.id);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
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
