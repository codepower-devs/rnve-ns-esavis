import {
    IsOptional
} from '@/common/validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
  
  export class CrearSintomasDto {
    @IsOptional()
    id?: string;
  
    @ApiProperty({ example: '15' })
    @IsString()
    sintomasId: string;
  
    @ApiProperty({ example: 'A04.4' })
    @IsString()
    cieAlfa: string;  

    @ApiProperty({ example: 'Otras infecciones intestinales debidas a Escherichia coli' })
    @IsString()
    cieDescripcion: string;  

  }
  