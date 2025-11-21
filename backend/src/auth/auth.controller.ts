import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'prisma/generated/client';
import { AuthService } from './auth.service';
import { Authorization } from './decorators/authorization.decorator';
import { Authorized } from './decorators/authorized.decorator';
import { LoginRequest } from './dto/login.dto';
import { RegisterRequest } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  create(
    @Res({ passthrough: true }) response: Response,
    @Body() data: RegisterRequest,
  ) {
    return this.authService.register(response, data);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(
    @Res({ passthrough: true }) response: Response,
    @Body() data: LoginRequest,
  ) {
    return this.authService.login(response, data);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    return this.authService.refresh(request, response);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@Authorized() user: User) {
    return user;
  }
}
