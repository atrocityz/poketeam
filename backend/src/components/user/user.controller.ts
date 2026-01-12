import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { Authorization } from '@/components/auth/decorators/authorization.decorator';
import { Authorized } from '@/components/auth/decorators/authorized.decorator';
import { User } from 'prisma/generated/client';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'Returns the current user profile.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Authorization()
  @Get('me')
  @HttpCode(HttpStatus.OK)
  me(@Authorized() user: User) {
    return user;
  }
}
