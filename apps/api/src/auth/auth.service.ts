import {
Injectable,
} from '@nestjs/common';


import {
PrismaService,
} from '../prisma/prisma.service';


import {
JwtService,
} from '@nestjs/jwt';



@Injectable()
export class AuthService {


constructor(

private prisma:PrismaService,

private jwt:JwtService,

){}




async validateDiscordUser(data:{
discordId:string;
username:string;
}){


let user = await this.prisma.user.findUnique({

where:{
discordId:data.discordId
}

});



if(!user){


user = await this.prisma.user.create({

data:{


discordId:data.discordId,


username:data.username,


role:'USER',


}

});


}



return user;


}






generateToken(user:any){


return this.jwt.sign({

sub:user.id,

discordId:user.discordId,

role:user.role,

});


}






verifyToken(token:string){

return this.jwt.verify(token);

}






async findUserById(id:string){


return this.prisma.user.findUnique({

where:{
id
}

});


}




}