import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { Role } from '@prisma/client';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) {}


  // Все пользователи
  @Get()
  findAll() {
    return this.usersService.findAll();
  }


  // Пользователь по Discord ID
  @Get(':discordId')
  findByDiscordId(
    @Param('discordId') discordId: string,
  ) {
    return this.usersService.findByDiscordId(discordId);
  }


  // Создание пользователя
  @Post()
  create(
    @Body()
    body: {
      discordId: string;
      username: string;
    },
  ) {
    return this.usersService.createUser(
      body.discordId,
      body.username,
    );
  }


  // Изменение роли
  @Patch(':id/role')
  updateRole(
    @Param('id') id: string,
    @Body()
    body: {
      role: Role;
    },
  ) {
    return this.usersService.updateRole(
      id,
      body.role,
    );
  }
}