import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { User } from 'prisma/generated/client';

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
