import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma.service';
import { RegisterRequest } from '@/components/auth/dto/register.dto';
import { hash } from 'argon2';
import { User } from 'prisma/generated/client';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  findByEmail = (email: User['email']) =>
    this.prismaService.user.findUnique({
      where: { email },
    });

  findById = (id: User['id']) =>
    this.prismaService.user.findUnique({
      where: { id },
    });

  create = async (data: RegisterRequest) =>
    this.prismaService.user.create({
      data: {
        email: data.email,
        password: await hash(data.password),
        login: data.login,
        avatarUrl: data.avatarUrl,
        team: {
          create: {
            pokemons: [],
          },
        },
      },
    });
}
