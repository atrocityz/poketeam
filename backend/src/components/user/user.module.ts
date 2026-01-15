import { Module } from '@nestjs/common';

import { UserService } from '@/components/user/user.service';
import { UserController } from '@/components/user/user.controller';
import { TeamService } from '@/components/team/team.service';

@Module({
  controllers: [UserController],
  providers: [UserService, TeamService],
  exports: [UserService],
})
export class UserModule {}
