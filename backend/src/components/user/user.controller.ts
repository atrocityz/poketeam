import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Authorization } from '@/components/auth/decorators/authorization.decorator';
import { Authorized } from '@/components/auth/decorators/authorized.decorator';
import { User } from 'prisma/generated/client';

@Controller('user')
export class UserController {
  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@Authorized() user: User) {
    return user;
  }
}
