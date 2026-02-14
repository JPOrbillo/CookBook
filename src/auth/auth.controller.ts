import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { signInDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Get(':id')
    findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }
}
