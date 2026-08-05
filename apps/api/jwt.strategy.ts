import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
) {

  constructor(
    config: ConfigService,
  ) {

    super({

      jwtFromRequest:
        ExtractJwt.fromExtractors([

          (request: any) => {

            if (
              request?.cookies?.access_token
            ) {

              return request.cookies.access_token;

            }


            if (
              request?.headers?.authorization
            ) {

              return request.headers.authorization
                .replace('Bearer ', '');

            }


            return null;

          },

        ]),


      ignoreExpiration: false,


      secretOrKey:
        config.get<string>('JWT_SECRET')!,

    });

  }



  async validate(payload: any) {

    return {

      id: payload.sub,

      discordId:
        payload.discordId,

      role:
        payload.role,

    };

  }

}