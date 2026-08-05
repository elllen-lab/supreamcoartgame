import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

import {
  Prisma,
  Role,
} from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';



@Injectable()
export class UsersService {


  constructor(
    private readonly prisma: PrismaService,
  ) {}




  /**
   * Все пользователи
   */
  async findAll() {

    return this.prisma.user.findMany({

      orderBy: {
        createdAt: 'desc',
      },

    });

  }







  /**
   * Получить список судей
   */
  async getJudges() {


    return this.prisma.user.findMany({

      where: {


        role: {

          in: [

            Role.JUDGE,

            Role.CHIEF_JUDGE,

          ],

        },


      },


      select: {


        id: true,

        username: true,

        discordId: true,

        role: true,


      },


      orderBy: {


        username: 'asc',


      },


    });


  }









  /**
   * Пользователь по Discord ID
   */
  async findByDiscordId(
    discordId:string,
  ) {


    return this.prisma.user.findUnique({

      where: {

        discordId,

      },

    });


  }









  /**
   * Создание пользователя
   */
  async createUser(

    discordId:string,

    username:string,

  ) {


    try {


      return await this.prisma.user.create({


        data:{


          discordId,

          username,

          role: Role.USER,


        },


      });



    } catch(error){


      if(


        error instanceof Prisma.PrismaClientKnownRequestError &&

        error.code === 'P2002'


      ){


        throw new ConflictException(

          'User with this Discord ID already exists',

        );


      }



      throw error;


    }


  }









  /**
   * Изменение роли пользователя
   */
  async updateRole(

    id:string,

    role:Role,

  ){


    try {


      return await this.prisma.user.update({


        where:{


          id,


        },


        data:{


          role,


        },


      });



    } catch(error){


      if(


        error instanceof Prisma.PrismaClientKnownRequestError &&

        error.code === 'P2025'


      ){


        throw new NotFoundException(

          'User not found',

        );


      }



      throw error;


    }


  }



}