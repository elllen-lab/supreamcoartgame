import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';


import {
  PrismaService
} from '../prisma/prisma.service';


import {
  Roles
} from '../auth/roles.decorator';


import {
  CreateCaseDto
} from './dto/create-case.dto';


import {
  AssignJudgeDto
} from './dto/assign-judge.dto';



@Controller('cases')
export class CasesController {


  constructor(
    private readonly prisma: PrismaService,
  ){}



  // ======================
  // Все дела
  // ======================


  @Get()
  async findAll(){


    return this.prisma.case.findMany({

      where:{
        deletedAt:null,
      },


      include:{


        author:{
          select:{
            id:true,
            username:true,
          },
        },


        judge:{
          select:{
            id:true,
            username:true,
            role:true,
          },
        },


        decision:true,


      },


      orderBy:{
        createdAt:'desc',
      },


    });


  }






  // ======================
  // Одно дело
  // ======================


  @Get(':id')
  async findOne(

    @Param('id')
    id:string,

  ){


    const result =
    await this.prisma.case.findUnique({


      where:{
        id,
      },


      include:{


        author:{
          select:{
            id:true,
            username:true,
          },
        },


        judge:{
          select:{
            id:true,
            username:true,
            role:true,
          },
        },


        decision:true,


        auditLogs:{


          orderBy:{
            createdAt:'desc',
          },


          include:{


            user:{
              select:{
                username:true,
              },
            },


          },


        },


      },


    });




    if(!result){


      throw new NotFoundException(
        'Дело не найдено'
      );


    }



    return result;


  }







  // ======================
  // Создание дела
  // ======================


  @Post()

  @Roles(
    'SUPER_ADMIN',
    'LAWYER',
  )

  async create(


    @Body()
    dto:CreateCaseDto,


    @Req()
    req:any,


  ){



    if(!req.user?.id){


      throw new BadRequestException(
        'Пользователь не авторизован'
      );


    }




    const count =
    await this.prisma.case.count();





    return this.prisma.case.create({


      data:{


        number:
        `SA-${String(count+1).padStart(4,'0')}`,


        title:
        dto.title,


        description:
        dto.description,


        authorId:
        req.user.id,


      },


    });


  }








  // ======================
  // Назначение судьи
  // ======================


  @Patch(':id/judge')


  @Roles(
    'SUPER_ADMIN',
    'CHIEF_JUDGE',
  )


  async assignJudge(


    @Param('id')
    id:string,


    @Body()
    dto:AssignJudgeDto,


    @Req()
    req:any,


  ){



    if(!req.user?.id){


      throw new BadRequestException(
        'Пользователь не авторизован'
      );


    }




    const caseData =
    await this.prisma.case.findUnique({


      where:{
        id,
      },


    });




    if(!caseData){


      throw new NotFoundException(
        'Судебное дело не найдено'
      );


    }





    if(caseData.judgeId){


      throw new BadRequestException(
        'У дела уже назначен судья'
      );


    }





    const judge =
    await this.prisma.user.findUnique({


      where:{
        id:dto.judgeId,
      },


    });





    if(!judge){


      throw new NotFoundException(
        'Судья не найден'
      );


    }





    const result =
    await this.prisma.$transaction(async(prisma)=>{



      const updatedCase =
      await prisma.case.update({


        where:{
          id,
        },


        data:{


          judgeId:dto.judgeId,


          status:'REVIEW',


        },


      });





      await prisma.auditLog.create({


        data:{


          userId:req.user.id,


          caseId:id,


          action:'ASSIGN_JUDGE',


          details:
          `Назначен судья ${judge.username} на дело ${caseData.number}`,


        },


      });





      return updatedCase;


    });





    return result;


  }



}