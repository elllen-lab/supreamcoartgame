import {
  Injectable,
} from '@nestjs/common';


import {
  PassportStrategy,
} from '@nestjs/passport';


import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';


import {
  ConfigService,
} from '@nestjs/config';


import {
  Role,
} from '@prisma/client';



@Injectable()
export class JwtStrategy
extends PassportStrategy(
  Strategy,
) {


  constructor(
    config: ConfigService,
  ) {


    super({

      jwtFromRequest:

      ExtractJwt.fromExtractors([


        (request:any)=>{


          console.log(
            "=== JWT COOKIE CHECK ==="
          );


          console.log(
            "COOKIES:",
            request?.cookies,
          );


          console.log(
            "ACCESS TOKEN:",
            request?.cookies?.access_token,
          );


          return request?.cookies?.access_token;


        },


        ExtractJwt.fromAuthHeaderAsBearerToken(),


      ]),



      ignoreExpiration:false,



      secretOrKey:

      config.get<string>(
        'JWT_SECRET',
      )!,


    });


  }





  async validate(

    payload:{
      sub:string;
      discordId:string;
      role:Role;
    },

  ){


    console.log(
      "JWT PAYLOAD:",
      payload,
    );



    return {


      id:
      payload.sub,



      discordId:
      payload.discordId,



      role:
      payload.role,


    };


  }


}