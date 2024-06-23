import { IsOptional } from '@/common/validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CrearAntecedenteDto {
  @IsOptional()
  id?: string;

  @ApiProperty({ example: '1' })
  @IsString()
  sintomaId: string;

  @ApiProperty({ example: 'U84.3' })
  @IsString()
  sintomaCodigo: string;

  @ApiProperty({ example: 'Resistencia a drogas antituberculosas' })
  @IsString()
  sintomaDescri: string | '';

  @ApiProperty({ example: '2024-05-10' })
  @IsString()
  fechaAnte: Date | '';

  @ApiPropertyOptional({ example: '1' })
  @IsString()
  medicamentoId: string | '';

  @ApiProperty({ example: 'J0501' })
  @IsString()
  medicamentoCodigo: string;

  @ApiProperty({ example: 'Abacavir' })
  @IsString()
  medicamentoDescri: string | '';

  @ApiProperty({ example: 'SI' })
  @IsString()
  embarazo: string;

  @ApiProperty({ example: 'NINGUNA' })
  @IsString()
  observacion: string;

  @IsOptional()
  esaviId?: string;
}
