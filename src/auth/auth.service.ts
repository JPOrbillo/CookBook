import { Injectable } from '@nestjs/common';
import {User} from "../users/entities/user.entity"
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { signInDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User)
    private repo: Repository<User>
    ){}

    async signIn(authLogIn: signInDto){
      const user = await this.repo.findOne({
        where:{username: authLogIn.username}
      })
      
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
  }

    const isMatch = await bcrypt.compare(authLogIn.password, user.password)

    if (!isMatch){
        throw new UnauthorizedException('Invalid credentials')
  }

  return {message: 'Successfully logged in! Welcome ', user}

      
    }
}
