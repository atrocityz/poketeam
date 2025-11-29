import { PrismaService } from '@/prisma.service';
import { expireTimeToMilliseconds } from '@/utils/expireTimeToMilliseconds';
import { isDev } from '@/utils/isDev';
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import type { Request, Response } from 'express';
import type { StringValue } from 'ms';
import type { User } from 'prisma/generated/client';
import type { LoginRequest } from './dto/login.dto';
import type { RegisterRequest } from './dto/register.dto';
import type { JwtPayload } from './interfaces/jwt.interface';

@Injectable()
export class AuthService {
  private readonly JWT_ACCESS_TOKEN_TTL: StringValue;
  private readonly JWT_REFRESH_TOKEN_TTL: StringValue;

  private readonly COOKIE_DOMAIN: string;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.JWT_ACCESS_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_ACCESS_TOKEN_TTL',
    );
    this.JWT_REFRESH_TOKEN_TTL = configService.getOrThrow<StringValue>(
      'JWT_REFRESH_TOKEN_TTL',
    );

    this.COOKIE_DOMAIN = configService.getOrThrow<string>('COOKIE_DOMAIN');
  }

  async register(data: RegisterRequest) {
    const existUser = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existUser) {
      throw new ConflictException('User with this email already exists');
    }

    await this.prismaService.user.create({
      data: {
        email: data.email,
        login: data.login,
        password: await hash(data.password),
      },
    });

    return true;
  }

  async login(response: Response, data: LoginRequest) {
    const currentUser = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!currentUser) {
      throw new NotFoundException('Login or password is incorrect');
    }

    const { password, ...user } = currentUser;

    const isValidPassword = await verify(password, data.password);

    if (!isValidPassword) {
      throw new NotFoundException('Login or password is incorrect');
    }

    return {
      ...this.auth(response, user.id),
      user,
    };
  }

  async logout(response: Response) {
    this.setCookie({
      response,
      value: 'refreshToken',
      expires: new Date(Date.now()),
    });

    return true;
  }

  async validate(id: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    return rest;
  }

  async refresh(request: Request, response: Response) {
    const refreshToken = request.cookies['refreshToken'];

    if (!refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload: JwtPayload = await this.jwtService.verifyAsync(refreshToken);

    if (payload) {
      const user = await this.prismaService.user.findUnique({
        where: {
          id: payload.id,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      return this.auth(response, user.id);
    }
  }

  private auth(response: Response, id: User['id']) {
    const { accessToken, refreshToken } = this.generateTokens(id);

    this.setCookie({
      response,
      value: refreshToken,
      expires: new Date(
        Date.now() + expireTimeToMilliseconds(this.JWT_REFRESH_TOKEN_TTL),
      ),
    });

    return {
      accessToken,
    };
  }

  private generateTokens(id: User['id']) {
    const payload: JwtPayload = { id };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_ACCESS_TOKEN_TTL,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.JWT_REFRESH_TOKEN_TTL,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private setCookie({
    response,
    value,
    expires,
  }: {
    response: Response;
    value: string;
    expires: Date;
  }) {
    response.cookie('refreshToken', value, {
      httpOnly: true,
      domain: this.COOKIE_DOMAIN,
      expires,
      secure: true,
      sameSite: isDev(this.configService) ? 'none' : 'lax',
    });
  }
}
