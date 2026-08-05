
import {
  Injectable,
  ForbiddenException,
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
export class CasesService {


  constructor(

    private prisma: PrismaService,

    private auditService: AuditService,

  ) {}





  // =========================
  // Все дела
  // =========================

  async findAll(

    _userId:string,

    _role:Role,

  ) {


    return this.prisma.case.findMany({


      include:{


        author:true,


        judge:true,


        decision:{


          include:{


            judge:true,


            approvedBy:true,


          },


        },


      },


      orderBy:{


        createdAt:'desc',


      },


    });


  }









  // =========================
  // Создание дела
  // =========================

  async create(


    data:{


      number:string;


      title:string;


      description:string;


    },


    userId:string,


    _role:Role,


  ){


    const courtCase =

      await this.prisma.case.create({


        data:{


          number:data.number,


          title:data.title,


          description:data.description,


          status:'OPEN',


          authorId:userId,


        },


      });





    await this.auditService.create(


      userId,


      'CREATE_CASE',


      `Создано дело ${courtCase.number}`,


      courtCase.id,


    );





    return courtCase;


  }









  // =========================
  // Получить дело
  // =========================

  async findOne(


    id:string,


    userId:string,


    _role:Role,


  ){


    const courtCase =

      await this.prisma.case.findUnique({


        where:{


          id,


        },


        include:{


          author:true,


          judge:true,


          decision:{


            include:{


              judge:true,


              approvedBy:true,


            },


          },


          auditLogs:{


            include:{


              user:true,


            },


            orderBy:{


              createdAt:'asc',


            },


          },


        },


      });





    if(!courtCase){


      return null;


    }






    await this.auditService.create(


      userId,


      'VIEW_CASE',


      `Просмотр дела ${courtCase.number}`,


      courtCase.id,


    );





    return courtCase;


  }









  // =========================
  // Назначить судью
  // =========================

  async assignJudge(


    caseId:string,


    judgeId:string,


    userId:string,


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






    const updated =

      await this.prisma.case.update({


        where:{


          id:caseId,


        },


        data:{


          judgeId,


          status:'REVIEW',


        },


        include:{


          judge:true,


        },


      });






    await this.auditService.create(


      userId,


      'ASSIGN_JUDGE',


      `Назначен судья ${judgeId} для дела ${caseId}`,


      caseId,


    );





    return updated;


  }









  // =========================
  // Дела текущего судьи
  // =========================

  async getMyJudgeCases(


    userId:string,


  ){


    return this.prisma.case.findMany({


      where:{


        judgeId:userId,


      },



      include:{


        author:{


          select:{


            id:true,


            username:true,


            role:true,


          },


        },



        judge:{


          select:{


            id:true,


            username:true,


            role:true,


          },


        },



        decision:{


          include:{


            judge:true,


            approvedBy:true,


          },


        },



      },



      orderBy:{


        createdAt:'desc',


      },


    });


  }









  // =========================
  // Полная информация дела
  // =========================

  async findFull(


    id:string,


    userId:string,


    _role:Role,


  ){



    const courtCase =

      await this.prisma.case.findUnique({



        where:{


          id,


        },



        include:{


          author:true,


          judge:true,



          decision:{


            include:{


              judge:true,


              approvedBy:true,


            },


          },



          auditLogs:{


            include:{


              user:true,


            },


            orderBy:{


              createdAt:'asc',


            },


          },


        },


      });






    if(courtCase){


      await this.auditService.create(


        userId,


        'VIEW_FULL_CASE',


        `Полный просмотр дела ${courtCase.number}`,


        courtCase.id,


      );


    }




    return courtCase;


  }



}
