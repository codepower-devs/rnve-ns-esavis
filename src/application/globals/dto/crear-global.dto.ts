import { IsNotEmpty, IsOptional } from '@/common/validation';
import { ApiProperty } from '@nestjs/swagger';

export class CrearGlobalsDto {
  @ApiProperty({ example: 'TD-CI' })
  @IsNotEmpty()
  codigo: string;

  @ApiProperty({ example: 'Cédula de identidad' })
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({ example: 'CD' })
  @IsNotEmpty()
  grupo: string;

  @ApiProperty({ example: 'Cédula de identidad' })
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ example: 'ACTIVO' })
  @IsOptional()
  estado?: string;
}

export class RespuestaCrearGlobalsDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  id: string;
}
