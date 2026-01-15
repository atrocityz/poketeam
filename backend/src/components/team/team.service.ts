import { Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TeamService {
  constructor(private readonly prismaService: PrismaService) {}

  findTeam = (userId: User['id']) =>
    this.prismaService.team.findUnique({
      where: {
        userId,
      },
    });

  // TODO: Need to create pokemon entity type
  update = (pokemons: any[], userId: User['id']) =>
    this.prismaService.team.update({
      where: {
        userId,
      },
      data: {
        pokemons,
      },
    });
}
