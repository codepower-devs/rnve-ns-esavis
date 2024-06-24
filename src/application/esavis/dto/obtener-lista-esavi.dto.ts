import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ObtenerNombreDto {
  @ApiProperty({ example: 'Aciclovir' })
  @IsString()
  nombre: string;
}
