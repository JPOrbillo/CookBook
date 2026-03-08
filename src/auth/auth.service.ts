import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { logInDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async logIn(authLogIn: logInDto) {
    const user = await this.repo.findOne({
      where: { username: authLogIn.username },
    });

    //Checks if user exists, also needed because isMatch needs to compare the password and if no user is found it will throw an error 
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(authLogIn.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      sub: user.id,
      fullname: user.firstname + ' ' + user.lastname,
    };

    return { token: await this.jwtService.signAsync(payload) };
  }
}
