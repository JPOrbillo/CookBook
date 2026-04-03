import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    const secretKey = configService.get<string>('SECRET_KEY');
    if (!secretKey) {
      throw new NotFoundException(
        'SECRET_KEY cannot be found in the configuration environment.',
      );
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secretKey,
    });
  }

  async validate(payload: any) {
    if (!payload || !payload.sub) {
      throw new NotFoundException('Invalid token payload');
    }

    if (payload === null || payload === undefined) {
      throw new NotFoundException('Invalid token payload');
    }

    const result = {
      id: payload.sub,
      fullname: payload.firstname + ' ' + payload.lastname,
    };

    return result;
  }
}
