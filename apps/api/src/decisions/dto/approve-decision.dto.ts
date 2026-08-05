import {
  IsOptional,
  IsString,
} from 'class-validator';

import {
  ApiPropertyOptional,
} from '@nestjs/swagger';


export class ApproveDecisionDto {


  @ApiPropertyOptional({
    description: 'Комментарий главного судьи',
    example: 'Решение проверено и утверждено',
  })
  @IsOptional()
  @IsString()
  comment?: string;


}