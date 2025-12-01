import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { generate } from 'generate-password';
import { Profile, Strategy } from 'passport-github';
import { AuthService } from '../auth.service';

@Injectable()
export class GithubOAuthStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      clientID: configService.getOrThrow('OAUTH_GITHUB_ID'),
      clientSecret: configService.getOrThrow('OAUTH_GITHUB_SECRET'),
      callbackURL: configService.getOrThrow('OAUTH_GITHUB_CALLBACK_URL'),
      scope: 'user:email',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateOAuthUser({
      email: await this.getPrimaryEmail(accessToken),
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

  private async getPrimaryEmail(accessToken: string) {
    const response = await fetch('https://api.github.com/user/emails', {
      headers: {
        Authorization: `token ${accessToken}`,
      },
    });

    const emails = await response.json();
    const primaryEmail = emails.find((email) => email.primary).email;

    return primaryEmail;
  }
}
