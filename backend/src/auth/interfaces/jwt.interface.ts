import { User } from 'prisma/generated/client';

export interface JwtPayload {
  id: User['id'];
}
