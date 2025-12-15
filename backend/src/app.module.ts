import { Module } from '@nestjs/common';
import { AuthModule } from '@/components/auth/auth.module';
import { UserModule } from '@/components/user/user.module';

@Module({
  imports: [AuthModule, UserModule],
})
export class AppModule {}
