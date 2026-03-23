import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/resources/customDecorators/isPublic.decorator';
import { ChangeUserPasswordDto } from './dto/change-userPassword.dto';
import { JwtAuthGuard } from 'src/resources/guards/jwt.auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  //calls the create method for in the service for account creation logic.
  //added public to make the route accessible without authentication.
  @Public()
  @Post('signUp')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  //calls the changePassword method in the service for the logic to change password

  @Patch('changePass/:username')
  changePassword(
    @Param('username') id: string,
    @Body() changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    return this.usersService.changePassword(id, changeUserPasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('allUsers')
  async findAll(@Request() req: any) {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('userProfile')
  async findOne(@Request() req: any) {
    return this.usersService.findOne(req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
