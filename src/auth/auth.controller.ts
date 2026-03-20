import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { logInDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/resources/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //this is a auth guard that will protect the route and only allow access if the user is authenticated
  @UseGuards(LocalAuthGuard)
  @Post('login')
  logIn(@Body() userDTO: logInDto) {
    return this.authService.validateUser(userDTO);
  }
}
