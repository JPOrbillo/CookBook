import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { LocalStrategy } from '../resources/passport strategies/local.strategies';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/resources/passport strategies/jwt.strategy';
import { use } from 'passport';
import { UserProfile } from 'src/users/entities/user-profile.entity';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User, UserProfile]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
    }),
  ],

  controllers: [AuthController],
  providers: [LocalStrategy, AuthService, JwtStrategy],
})
export class AuthModule {}
