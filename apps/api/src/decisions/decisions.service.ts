import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';


import {
  PrismaService,
} from '../prisma/prisma.service';


import {
  AuditService,
} from '../audit/audit.service';


import {
  Role,
} from '@prisma/client';



@Injectable()
export class DecisionsService {


  constructor(

    private prisma: PrismaService,

    private auditService: AuditService,

  ) {}





  // =========================
  // Создать решение
  // =========================


  async createDecision(

    caseId:string,

    userId:string,

    text:string,

    role:Role,

  ){


    if(role !== Role.JUDGE){

      throw new ForbiddenException(
        'Только судья может вынести решение',
      );

    }



    const courtCase =

      await this.prisma.case.findUnique({

        where:{
          id:caseId,
        },

      });



    if(!courtCase){

      throw new NotFoundException(
        'Дело не найдено',
      );

    }





    if(courtCase.judgeId !== userId){


      throw new ForbiddenException(
        'Вы не назначены судьёй этого дела',
      );


    }







    const decision =

      await this.prisma.caseDecision.create({

        data:{


          caseId,


          judgeId:userId,


          text,


          status:'PENDING',


        },


      });







    await this.auditService.create(

      userId,

      'CREATE_DECISION',

      `Создано решение по делу ${courtCase.number}`,

      caseId,

    );





    return decision;


  }








  // =========================
  // Одобрить решение
  // =========================


  async approveDecision(


    caseId:string,


    userId:string,


    comment:string | undefined,


    role:Role,


  ){



    if(

      role !== Role.CHIEF_JUDGE &&

      role !== Role.SUPER_ADMIN

    ){


      throw new ForbiddenException(
        'Недостаточно прав',
      );


    }






    const decision =

      await this.prisma.caseDecision.findFirst({

        where:{
          caseId,
        },

      });







    if(!decision){


      throw new NotFoundException(
        'Решение не найдено',
      );


    }







    const updated =

      await this.prisma.caseDecision.update({


        where:{

          id:decision.id,

        },



        data:{


          status:'APPROVED',


          approvedById:userId,


        },


      });








    await this.auditService.create(


      userId,


      'APPROVE_DECISION',


      comment

      ?

      `Решение утверждено: ${comment}`

      :

      `Решение утверждено по делу ${caseId}`,



      caseId,


    );







    return updated;



  }



}