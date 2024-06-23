import {
    IsOptional
} from '@/common/validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
  
  export class CrearCriterioDto {
    @IsOptional()
    id?: string;
  
    @ApiProperty({ example: '1' })
    @IsString()
    criterioId: string;
  
    @ApiProperty({ example: 'MUERTE' })
    @IsString()
    nombreCriterio: string;  

  }
  