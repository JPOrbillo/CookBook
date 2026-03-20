import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from 'src/resources/customDecorators/isPublic.decorator';
import { ChangeUserPasswordDto } from './dto/change-userPassword.dto';

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

  @Get('allUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
