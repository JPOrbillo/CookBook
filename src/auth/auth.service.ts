import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { logInDto } from 'src/users/dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserProfile } from 'src/users/entities/user-profile.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
    private jwtService: JwtService,

    @InjectRepository(UserProfile)
    private userProfileRepo: Repository<UserProfile>,
  ) {}
  //**************************************************************************************//
  async create(createUserDto: CreateUserDto): Promise<string> {
    const usernameDuplicate = await this.repo.findOne({
      where: { username: createUserDto.username },
    });

    if (usernameDuplicate) {
      throw new ConflictException('Username already exists');
    }
    const salt = 10;
    const hash = await bcrypt.hash(createUserDto.password, salt);

    const createUser = this.repo.create({
      ...createUserDto,
      password: hash,
    });

    await this.repo.save(createUser);

    const userProfile = this.userProfileRepo.create({
      userProfile: createUser,
      fullname: createUser.firstname + ' ' + createUser.lastname,
    });

    await this.repo.save(createUser);

    await this.userProfileRepo.save(userProfile);

    return 'user created successfully';
  }
  //**************************************************************************************//
  async validateUser(authLogIn: logInDto): Promise<object | null> {
    try {
      //Checks if user exists, also needed because isMatch needs to compare the password and if no user is found it will throw an error
      const user = await this.repo.findOne({
        where: { username: authLogIn.username },
      });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const isMatch = await bcrypt.compare(authLogIn.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedException('Invalid password');
      }

      const { password, ...result } = user;
      return result;
    } catch (error) {
      console.error('Error validating user:', error);
      return null;
    }
  }
  //**************************************************************************************//
  async login(user: User): Promise<{ token: string } | null> {
    const payload = {
      user: user.firstname + ' ' + user.lastname,
      sub: user.id,
    };
    if (!user) {
      return null;
    }

    return {
      token: this.jwtService.sign(payload),
    };
  }
}
