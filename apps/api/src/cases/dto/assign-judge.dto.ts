import {
  IsUUID,
} from 'class-validator';


import {
  ApiProperty,
} from '@nestjs/swagger';



export class AssignJudgeDto {


  @ApiProperty({
    description: 'ID пользователя-судьи',
    example: 'e2995d79-c765-4bd1-959f-d9375d950f1b',
  })
  @IsUUID()
  judgeId!: string;


}