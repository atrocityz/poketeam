import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { getJwtConfig } from '@/utils/config';
import { UserModule } from '@/components/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {
  GithubOAuthStrategy,
  GoogleOauthStrategy,
  JwtStrategy,
} from './strategies';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: getJwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    ConfigService,
    JwtStrategy,
    GoogleOauthStrategy,
    GithubOAuthStrategy,
  ],
})
export class AuthModule {}
