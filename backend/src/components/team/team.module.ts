import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { TeamController } from '@/components/team/team.controller';
import { TeamService } from '@/components/team/team.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, PrismaService],
  exports: [TeamService],
})
export class TeamModule {}
