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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private teamService: TeamService) {}

  @ApiOperation({ summary: 'Get user team' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Returns the user team.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @Authorization()
  @Get()
  @HttpCode(HttpStatus.OK)
  getTeam(@Authorized('id') userId: User['id']) {
    return this.teamService.findTeam(userId);
  }

  @ApiOperation({ summary: 'Update user team' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Team updated successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiBody({ type: TeamDto })
  @Authorization()
  @Put('update')
  @HttpCode(HttpStatus.OK)
  updateTeam(@Authorized('id') userId: User['id'], @Body() data: TeamDto) {
    return this.teamService.update(data.pokemons, userId);
  }
}
