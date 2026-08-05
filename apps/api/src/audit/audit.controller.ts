import {
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';

import { AuditService } from './audit.service';

import { AuthGuard } from '@nestjs/passport';


@Controller('audit')
export class AuditController {


  constructor(
    private auditService: AuditService,
  ) {}



  // Все логи
  @Get()
  @UseGuards(AuthGuard('jwt'))
  findAll() {

    return this.auditService.findAll();

  }



  // Логи дела
  @Get('case/:id')
  @UseGuards(AuthGuard('jwt'))
  findCase(

    @Param('id')
    id:string,

  ) {

    return this.auditService.findByCase(id);

  }



  // Логи пользователя
  @Get('user/:id')
  @UseGuards(AuthGuard('jwt'))
  findUser(

    @Param('id')
    id:string,

  ) {

    return this.auditService.findByUser(id);

  }


}