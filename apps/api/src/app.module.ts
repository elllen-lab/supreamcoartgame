import {
  Module,
} from '@nestjs/common';


import {
  ConfigModule,
} from '@nestjs/config';


import {
  APP_GUARD,
} from '@nestjs/core';



import {
  AppController,
} from './app.controller';


import {
  AppService,
} from './app.service';



import {
  PrismaModule,
} from './prisma/prisma.module';



import {
  UsersModule,
} from './users/users.module';



import {
  CasesModule,
} from './cases/cases.module';



import {
  AuthModule,
} from './auth/auth.module';



import {
  DecisionsModule,
} from './decisions/decisions.module';



import {
  AuditModule,
} from './audit/audit.module';



import {
  AuthGuard,
} from './auth/guards/auth.guard';



import {
  RolesGuard,
} from './auth/roles.guard';






@Module({

  imports: [


    ConfigModule.forRoot({

      isGlobal: true,

      envFilePath: '.env',

    }),



    PrismaModule,


    UsersModule,


    CasesModule,


    AuthModule,


    DecisionsModule,


    AuditModule,


  ],






  controllers: [


    AppController,


  ],






  providers: [


    AppService,



    // ===============================
    // JWT Cookie Authentication
    // ===============================

    {
      provide: APP_GUARD,

      useClass: AuthGuard,

    },



    // ===============================
    // Roles Protection
    // ===============================

    {
      provide: APP_GUARD,

      useClass: RolesGuard,

    },


  ],



})


export class AppModule {}