import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';


@Injectable()
export class UsersService {

  constructor(
    private prisma: PrismaService,
  ) {}


  findAll() {
    return this.prisma.user.findMany();
  }


  findByDiscordId(discordId: string) {
    return this.prisma.user.findUnique({
      where: {
        discordId,
      },
    });
  }


  createUser(
    discordId: string,
    username: string,
  ) {
    return this.prisma.user.create({
      data: {
        discordId,
        username,
      },
    });
  }


  updateRole(
    id: string,
    role: Role,
  ) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
  }
}