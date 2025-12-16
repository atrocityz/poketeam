import { Module } from '@nestjs/common';
import { AuthModule } from '@/components/auth/auth.module';
import { UserModule } from '@/components/user/user.module';
import { TeamModule } from '@/components/team/team.module';

@Module({
  imports: [AuthModule, UserModule, TeamModule],
})
export class AppModule {}
