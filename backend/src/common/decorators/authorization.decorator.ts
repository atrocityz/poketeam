import { applyDecorators, UseGuards } from '@nestjs/common';

import { JwtGuard } from '@/components/auth/guards';

export const Authorization = () => {
  return applyDecorators(UseGuards(JwtGuard));
};
