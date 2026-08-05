import {
  Controller,
  Get,
} from '@nestjs/common';

import {
  PrismaService,
} from '../prisma/prisma.service';


@Controller('users')
export class UsersController {


  constructor(
    private readonly prisma: PrismaService,
  ) {}



  /**
   * Все пользователи
   */
  @Get()
  async getUsers(){


    return this.prisma.user.findMany({

      orderBy:{
        createdAt:'desc',
      },

      select:{


        id:true,

        username:true,

        discordId:true,

        role:true,


        createdAt:true,


      },


    });


  }





  /**
   * Судьи
   */
  @Get('judges')
  async getJudges(){


    return this.prisma.user.findMany({


      where:{


        role:{


          in:[

            'JUDGE',

            'CHIEF_JUDGE',

          ],


        },


      },


      select:{


        id:true,

        username:true,

        discordId:true,

        role:true,


      },


      orderBy:{


        username:'asc',


      },


    });


  }


}