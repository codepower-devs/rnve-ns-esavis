import { IsNotEmpty } from '@/common/validation';

export class CrearGlobalesDto {
  @IsNotEmpty()
  tablaId: number;

  @IsNotEmpty()
  catalogoId: number;

  @IsNotEmpty()
  grupo: string;

  @IsNotEmpty()
  descripcion: string;

  @IsNotEmpty()
  estado: string;

  @IsNotEmpty()
  usuarioCreacion: string;
}

export class RespuestaCrearGlobalesDto {
  @IsNotEmpty()
  id: string;
}
