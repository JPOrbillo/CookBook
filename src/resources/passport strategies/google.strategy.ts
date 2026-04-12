// google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(configService: ConfigService) {
    const clientID = configService.get<string>('GOOGLE_CLIENT_ID');
    if (!clientID) {
      throw new Error(
        'GOOGLE_CLIENT_ID cannot be found in the configuration environment.',
      );
    }
    const clientSecret = configService.get<string>('GOOGLE_CLIENT_SECRET');
    if (!clientSecret) {
      throw new Error(
        'GOOGLE_CLIENT_SECRET cannot be found in the configuration environment.',
      );
    }

    const callbackURL = configService.get<string>('CALLBACK_URL');
    if (!callbackURL) {
      throw new Error(
        'CALLBACK_URL cannot be found in the configuration environment.',
      );
    }

    super({
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: callbackURL,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
