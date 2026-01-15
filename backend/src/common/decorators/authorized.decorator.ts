import { createParamDecorator, type ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { User } from 'prisma/generated/client';

export const Authorized = createParamDecorator(
  (data: keyof User, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request;

    const user = request.user;

    return data ? user[data] : user;
  },
);
