import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class FiltroAvanzadoEsaviDto extends PaginacionQueryDto {
  @ApiPropertyOptional({ example: 'CAF123' })
  @IsOptional()
  caseId?: string;

  @ApiPropertyOptional({ example: 'ANA' })
  @IsOptional()
  nombres?: string;

  @ApiPropertyOptional({ example: 'PEREZ' })
  @IsOptional()
  primerApellido?: string;

  @ApiPropertyOptional({ example: 'TORREZ' })
  @IsOptional()
  segundoApellido?: string;

  @ApiPropertyOptional({ example: '4234435' })
  @IsOptional()
  nroDocumento?: string;
}
