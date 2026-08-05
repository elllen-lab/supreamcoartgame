import { Role } from '@prisma/client';


export interface AuthUser {

  id: string;

  discordId: string;

  role: Role;

}