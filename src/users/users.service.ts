import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {User} from "./entities/user.entity"
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User)
  private repo: Repository<User>
){}
  async create(createUserDto: CreateUserDto) {
    const salt = 10;
    const hash = await bcrypt.hash(createUserDto.password, salt)
    const createUser = this.repo.create({...createUserDto, password:hash}); //the "..." means it creates 
    return this.repo.save(createUser)
  }

  findAll() {
    return this.repo.find()
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
