import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
} from '@nestjs/common';

import { CasesService } from './cases.service';


@Controller('cases')
export class CasesController {

  constructor(
    private casesService: CasesService,
  ) {}


  // Получить все дела
  @Get()
  findAll() {
    return this.casesService.findAll();
  }


  // Создать дело
  @Post()
  create(
    @Body()
    body: {
      number: string;
      title: string;
      description: string;
    },
  ) {
    return this.casesService.create(body);
  }


  // Получить одно дело
  @Get(':id')
  findOne(
    @Param('id') id: string,
  ) {
    return this.casesService.findOne(id);
  }


  // Назначить судью
  @Patch(':id/judge')
  assignJudge(
    @Param('id') id: string,
    @Body()
    body: {
      judgeId: string;
    },
  ) {
    return this.casesService.assignJudge(
      id,
      body.judgeId,
    );
  }

}