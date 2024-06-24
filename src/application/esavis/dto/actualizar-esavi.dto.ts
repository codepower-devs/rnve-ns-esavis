import { IsNotEmpty, IsOptional } from '@/common/validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ActualizarEsaviDto {
  @ApiProperty({ example: '12' })
  @IsNotEmpty()
  id: string;

  @ApiPropertyOptional({ example: 'ASDFF' })
  @IsOptional()
  @IsString()
  cualCuadro?: string;

  @ApiPropertyOptional({ example: '2024-04-05' })
  @IsOptional()
  fum?: Date | '';

  @ApiPropertyOptional({ example: '2024-04-05 10:05' })
  @IsOptional()
  fechaSintomas?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsString()
  desenlaceEsavi?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  profesionNoti?: string;

  @ApiPropertyOptional({ example: 'PABLO' })
  @IsOptional()
  @IsString()
  nombresNoti?: string;

  @ApiPropertyOptional({ example: 'NUEVO' })
  @IsOptional()
  @IsString()
  primerApellidoNoti?: string;

  @ApiPropertyOptional({ example: 'OTRO' })
  @IsOptional()
  @IsString()
  segundoApellidoNoti?: string;

  @ApiPropertyOptional({ example: '77855561' })
  @IsOptional()
  @IsString()
  telefonoNoti?: string;

  @ApiPropertyOptional({ example: '2002-05-07' })
  @IsOptional()
  fechaNaciNoti?: Date;

  @ApiPropertyOptional({ example: '53534534' })
  @IsOptional()
  @IsString()
  nroDocumentoNoti?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsString()
  instanciaClasi?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsString()
  clasifiFinal?: string;
}
