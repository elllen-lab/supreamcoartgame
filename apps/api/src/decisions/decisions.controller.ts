import {
  Body,
  Controller,
  Param,
  Post,
  Patch,
  Req,
} from '@nestjs/common';

import {
  DecisionsService,
} from './decisions.service';

import {
  CreateDecisionDto,
} from './dto/create-decision.dto';

import {
  ApproveDecisionDto,
} from './dto/approve-decision.dto';

import type{
  Request,
} from 'express';


@Controller()
export class DecisionsController {


  constructor(
    private readonly decisionsService: DecisionsService,
  ) {}





  // =========================
  // Создать решение суда
  // =========================


  @Post('cases/:id/decision')
  async createDecision(

    @Param('id')
    caseId:string,


    @Body()
    dto:CreateDecisionDto,


    @Req()
    req:Request,

  ){


    const user:any = req.user;


    return this.decisionsService.createDecision(

      caseId,

      user.id,

      dto.text,

      user.role,

    );


  }








  // =========================
  // Утвердить решение
  // =========================


  @Patch('cases/:id/decision/approve')
  async approveDecision(

    @Param('id')
    caseId:string,


    @Body()
    dto:ApproveDecisionDto,


    @Req()
    req:Request,

  ){


    const user:any = req.user;


    return this.decisionsService.approveDecision(

      caseId,

      user.id,

      dto.comment,

      user.role,

    );


  }



}