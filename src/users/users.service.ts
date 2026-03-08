import { Injectable } from '@nestjs/common';
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

  async changePassword(
    id: string,
    changeUserPasswordDto: ChangeUserPasswordDto,
  ) {
    //checks which user is trying to change their password using their username
    const user = await this.repo.findOne({
      where: { username: changeUserPasswordDto.username },
    });

    //throws an error if there is no user found with the provided username
    //this cannot be removed because it is promised in isMatch and it expects a user to be found
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

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
