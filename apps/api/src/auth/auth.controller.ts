import {
  BadRequestException,
  Controller,
  Get,
  Query,
  Res,
  Req,
} from '@nestjs/common';

import {
  ConfigService,
} from '@nestjs/config';

import type {
  Response,
  Request,
} from 'express';

import axios from 'axios';

import {
  AuthService,
} from './auth.service';

import {
  Public,
} from './public.decorator';



@Controller('auth')
export class AuthController {



constructor(

private readonly authService: AuthService,

private readonly configService: ConfigService,

){}






// ===============================
// Discord Login
// ===============================


@Public()
@Get('discord')
discordLogin(

@Res()
res: Response,

){


const clientId =

this.configService.get<string>(
'DISCORD_CLIENT_ID',
);



const callback =

this.configService.get<string>(
'DISCORD_CALLBACK_URL',
);




const url =

'https://discord.com/oauth2/authorize'

+

`?client_id=${clientId}`

+

'&response_type=code'

+

`&redirect_uri=${encodeURIComponent(callback!)}`

+

'&scope=identify%20email';




return res.redirect(url);


}









// ===============================
// Discord Callback
// ===============================


@Public()
@Get('discord/callback')
async discordCallback(


@Query('code')
code:string,


@Res()
res:Response,


){



if(!code){

throw new BadRequestException(
'Discord code missing',
);

}



try{



const tokenResponse =

await axios.post(


'https://discord.com/api/oauth2/token',


new URLSearchParams({



client_id:

this.configService.get<string>(
'DISCORD_CLIENT_ID',
)!,



client_secret:

this.configService.get<string>(
'DISCORD_CLIENT_SECRET',
)!,



grant_type:

'authorization_code',



code,



redirect_uri:

this.configService.get<string>(
'DISCORD_CALLBACK_URL',
)!,


}),


{

headers:{

'Content-Type':

'application/x-www-form-urlencoded',

},

},


);





const accessToken =

tokenResponse.data.access_token;






const discordResponse =

await axios.get(


'https://discord.com/api/users/@me',


{

headers:{

Authorization:

`Bearer ${accessToken}`,

},

},


);






const discordUser =

discordResponse.data;






const user =

await this.authService.validateDiscordUser({

discordId:

discordUser.id,


username:

discordUser.username,

});








const jwt =

this.authService.generateToken({

id:user.id,

discordId:user.discordId,

role:user.role,

});






console.log(
'JWT CREATED'
);






res.cookie(

'access_token',

jwt,

{

httpOnly:true,

secure:false,


sameSite:'lax',


domain:'localhost',


path:'/',


maxAge:

1000 *
60 *
60 *
24 *
7,


}

);






console.log(
'COOKIE CREATED'
);







const frontend =

this.configService.get<string>(
'FRONTEND_URL',
)

??

'http://localhost:3000';






return res.redirect(

`${frontend}/dashboard`

);




}

catch(error){


console.error(
'DISCORD ERROR:',
error
);



throw new BadRequestException(

'Discord authorization failed',

);


}



}









// ===============================
// Check Auth
// ===============================


@Public()
@Get('check')
async checkAuth(

@Req()
req:Request,

){



console.log(
'CHECK COOKIE:',
req.cookies
);




const token =

req.cookies?.access_token;





if(!token){

return {

authenticated:false,

};

}






try{



const payload =

this.authService.verifyToken(token);





const user =

await this.authService.findUserById(

payload.sub,

);





return {

authenticated:true,

user,

};




}

catch(error){


console.log(
'JWT ERROR:',
error
);



return {

authenticated:false,

};


}



}









// ===============================
// Current User
// ===============================


@Get('me')
async me(

@Req()
req:Request,

){



console.log(
'ME COOKIE:',
req.cookies
);





const token =

req.cookies?.access_token;





if(!token){

return {

authenticated:false,

};

}





try{



const payload =

this.authService.verifyToken(token);





const user =

await this.authService.findUserById(

payload.sub,

);





return {

authenticated:true,

user,

};



}

catch(error){


console.log(
'JWT ERROR:',
error
);



return {

authenticated:false,

};


}



}









// ===============================
// Logout
// ===============================


@Public()
@Get('logout')
logout(

@Res()
res:Response,

){



res.clearCookie(

'access_token',

{

httpOnly:true,

secure:false,

sameSite:'lax',

path:'/',

},

);





return res.json({

success:true,

});


}



}