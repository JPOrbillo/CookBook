import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { logInDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  async validateUser(authLogIn: logInDto): Promise<any> {
    //Checks if user exists, also needed because isMatch needs to compare the password and if no user is found it will throw an error
    const user = await this.repo.findOne({
      where: { username: authLogIn.username },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(authLogIn.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    } else {
      return false;
    }
  }
}
