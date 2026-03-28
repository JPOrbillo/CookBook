import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from 'src/resources/guards/local-auth.guard';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { Public } from 'src/resources/customDecorators/isPublic.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //this is a auth guard that will protect the route and only allow access if the user is authenticated
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }

  //calls the create method for in the service for account creation logic.
  //added public to make the route accessible without authentication.
  @Public()
  @Post('signUp')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
}
