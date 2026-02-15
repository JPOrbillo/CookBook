import { Controller, Post, Body} from '@nestjs/common';
import { signInDto } from 'src/users/dto/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}
    @Post('login')
    signIn(@Body() userDTO: signInDto) {
    return this.authService.signIn(userDTO);
  }
}
