import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { Strategy } from 'passport-discord';

import { ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';



@Injectable()
export class DiscordStrategy
extends PassportStrategy(
  Strategy,
  'discord',
) {



constructor(

private readonly authService: AuthService,

config: ConfigService,

){


super({

clientID:
config.get<string>(
'DISCORD_CLIENT_ID'
)!,


clientSecret:
config.get<string>(
'DISCORD_CLIENT_SECRET'
)!,


callbackURL:
config.get<string>(
'DISCORD_CALLBACK_URL'
)!,


scope:[
'identify',
'email',
],


});


}






async validate(

_accessToken:string,

_refreshToken:string,

profile:any,

done:any,

){



const user =
await this.authService.validateDiscordUser({

discordId:
profile.id,


username:
profile.username,


});



done(
null,
user,
);


}



}