import { Module } from '@nestjs/common';
import { AuthModule } from '@/components/auth/auth.module';
import { UserModule } from '@/components/user/user.module';
import { TeamModule } from '@/components/team/team.module';
import { PrismaModule } from './components/prisma/prisma.module';

@Module({
  imports: [AuthModule, UserModule, TeamModule, PrismaModule],
})
export class AppModule {}
