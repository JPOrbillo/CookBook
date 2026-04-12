import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ChangeUserPasswordDto } from './dto/change-userPassword.dto';
import { JwtAuthGuard } from 'src/resources/guards/jwt.auth-guard';
import { LocalAuthGuard } from 'src/resources/guards/local-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard, LocalAuthGuard)
  @Get('allUsers')
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('userProfile')
  async userProfile(@Request() req: any) {
    return this.usersService.userProfile(req.user.id);
  }

  //calls the changePassword method in the service for the logic to change password

  @UseGuards(JwtAuthGuard)
  @Patch('changePass/:username')
  changePassword(
    @Request() req: any,
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    return this.usersService.changePassword(req.user.id, changeUserPasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
