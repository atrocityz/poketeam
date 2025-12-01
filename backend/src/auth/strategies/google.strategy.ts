import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { generate } from 'generate-password';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.getOrThrow('OAUTH_GOOGLE_ID'),
      clientSecret: configService.getOrThrow('OAUTH_GOOGLE_SECRET'),
      callbackURL: configService.getOrThrow('OAUTH_GOOGLE_CALLBACK_URL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      login: profile.displayName,
      password: generate({
        length: 20,
        numbers: true,
        symbols: true,
        uppercase: true,
        excludeSimilarCharacters: true,
      }),
    });

    return user;
  }
}
