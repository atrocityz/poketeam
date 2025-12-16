import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Put,
} from '@nestjs/common';
import { TeamService } from '@/components/team/team.service';
import { User } from 'prisma/generated/client';
import { Authorized } from '@/components/auth/decorators/authorized.decorator';
import { TeamDto } from '@/components/team/dto/team.dto';
import { Authorization } from '@/components/auth/decorators/authorization.decorator';

@Controller('user/team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @Authorization()
  @Get()
  @HttpCode(HttpStatus.OK)
  getTeam(@Authorized('id') userId: User['id']) {
    return this.teamService.findTeam(userId);
  }

  @Authorization()
  @Put('update')
  @HttpCode(HttpStatus.OK)
  updateTeam(@Authorized('id') userId: User['id'], @Body() data: TeamDto) {
    return this.teamService.update(data.pokemons, userId);
  }
}
