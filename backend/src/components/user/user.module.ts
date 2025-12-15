import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { UserService } from '@/components/user/user.service';
import { UserController } from '@/components/user/user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
