import {
  ApiProperty,
} from '@nestjs/swagger';

import {
  IsString,
  MinLength,
} from 'class-validator';


export class CreateDecisionDto {


  @ApiProperty({

    example:
    'Суд постановил признать ответчика виновным.',

    description:
    'Текст судебного решения',

  })

  @IsString()

  @MinLength(10)

  text!: string;


}