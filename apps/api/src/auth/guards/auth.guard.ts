import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';


import {
  Reflector,
} from '@nestjs/core';


import type {
  Request,
} from 'express';


import {
  AuthService,
} from '../auth.service';


import {
  IS_PUBLIC_KEY,
} from '../public.decorator';




@Injectable()
export class AuthGuard implements CanActivate {



  constructor(

    private readonly authService: AuthService,

    private readonly reflector: Reflector,

  ) {}






  async canActivate(

    context: ExecutionContext,

  ): Promise<boolean> {




    // ===============================
    // Public routes
    // ===============================


    const isPublic =

      this.reflector.getAllAndOverride<boolean>(

        IS_PUBLIC_KEY,

        [

          context.getHandler(),

          context.getClass(),

        ],

      );



    if (isPublic === true) {

      return true;

    }






    // ===============================
    // Request
    // ===============================


    const request =

      context

        .switchToHttp()

        .getRequest<Request>();






    // ===============================
    // Cookie JWT
    // ===============================


    const token =

      request.cookies?.access_token;





    if (!token) {


      throw new UnauthorizedException(

        'JWT token missing',

      );


    }







    try {



      const payload =

        this.authService.verifyToken(

          token,

        );




      request.user = payload;





      return true;



    } catch (error) {



      throw new UnauthorizedException(

        'Invalid JWT token',

      );


    }



  }



}