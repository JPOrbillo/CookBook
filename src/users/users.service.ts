import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ChangeUserPasswordDto } from './dto/change-userPassword.dto';
import { UserProfile } from './entities/user-profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,

    @InjectRepository(UserProfile)
    private userProfileRepo: Repository<UserProfile>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async userProfile(userID: any) {
    const foundUser = await this.userProfileRepo.findOne({
      where: { user: userID },
    });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    const { ...result } = foundUser;
    return result;
  }

  async changePassword(
    id: string,
    changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    //checks which user is trying to change their password using their username
    const user = await this.repo.findOne({
      where: { username: changeUserPasswordDto.username },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(
      changeUserPasswordDto.oldPassword,
      user.password,
    );

    if (!isMatch) {
      throw new Error('Old password is incorrect');
    }

    const salt = 10;
    const hash = await bcrypt.hash(changeUserPasswordDto.newPassword, salt);

    const updateUserPassword = this.repo.update(id, { password: hash });
    return updateUserPassword;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
