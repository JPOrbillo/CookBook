import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ChangeUserPasswordDto } from './dto/change-userPassword.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  //this is the logic for creating a user, it hashes password before saving it to the database for security.
  async create(createUserDto: CreateUserDto) {
    const salt = 10;
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const createUser = this.repo.create({ ...createUserDto, password: hash });
    return this.repo.save(createUser);
  }

  findAll() {
    return this.repo.find();
  }

  async userProfile(userID: string) {
    const foundUser = await this.repo.findOne({ where: { user_ID: userID } });
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = foundUser;
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
