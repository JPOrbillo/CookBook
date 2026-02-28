import { Controller, Post, Body } from '@nestjs/common';
import { logInDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/customDecorators/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('login')
  logIn(@Body() userDTO: logInDto) {
    return this.authService.logIn(userDTO);
  }
}
