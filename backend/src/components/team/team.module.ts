import { Module } from '@nestjs/common';

import { TeamService } from '@/components/team/team.service';
import { TeamController } from '@/components/team/team.controller';

@Module({
  controllers: [TeamController],
  providers: [TeamService],
  exports: [TeamService],
})
export class TeamModule {}
