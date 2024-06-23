import { IsOptional } from '@/common/validation';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { CrearCriterioDto } from './crear-criterios.dto';
import { CrearSintomasDto } from './crear-sintomas.dto';
import { CrearAntecedenteDto } from './crear-antecedente.dto';

export class CrearEsaviDto {
  @IsOptional()
  id?: string | '';

  @ApiPropertyOptional({ example: 'FASDF42334' })
  @IsOptional()
  @IsString()
  caseId?: string;

  @ApiPropertyOptional({ example: '123' })
  @IsOptional()
  personaId?: string | '';

  @ApiProperty({ example: '3213' })
  @IsOptional()
  pacienteId?: string;

  @ApiProperty({ example: '343543' })
  @IsString()
  vacunaId: string;

  @ApiPropertyOptional({ example: 'PABLO' })
  @IsOptional()
  @IsString()
  nombres?: string;

  @ApiPropertyOptional({ example: 'PEREZ' })
  @IsOptional()
  @IsString()
  primerApellido?: string;

  @ApiPropertyOptional({ example: 'ORTIZ' })
  @IsOptional()
  @IsString()
  segundoApellido?: string;

  @ApiPropertyOptional({ example: '32423' })
  @IsOptional()
  @IsString()
  nroDocumento?: string;

  @ApiPropertyOptional({ example: '1' })
  @IsOptional()
  @IsString()
  genero?: string;

  @ApiPropertyOptional({ example: '2002-05-09' })
  @IsOptional()
  fechaNaci?: string;

  @ApiProperty({ example: '20' })
  @IsOptional()
  edad?: string;

  @ApiPropertyOptional({ example: 'ASDFASDF' })
  @IsOptional()
  @IsString()
  anteAlergias?: string;

  @ApiPropertyOptional({ example: 'ASDFF' })
  @IsOptional()
  @IsString()
  cualCuadro?: string;

  // para paciente mujer
  @ApiPropertyOptional({ example: '2024-04-05' })
  @IsOptional()
  fum?: Date | '';

  //esavi
  @ApiProperty({ example: '2024-04-05 10:05' })
  @IsOptional()
  fechaSintomas?: string | '';

  @ApiPropertyOptional({ example: 'ASDDAS' })
  @IsOptional()
  @IsString()
  desenlaceEsavi?: string | 'QWEQWE';

  @ApiPropertyOptional({ example: '12332' })
  @IsOptional()
  idNoti?: string | '';

  @ApiProperty({ example: '2' })
  @IsOptional()
  @IsString()
  profesionNoti?: string | '';

  @ApiProperty({ example: 'PABLO' })
  @IsOptional()
  @IsString()
  nombresNoti?: string | '';

  @ApiProperty({ example: 'NUEVO' })
  @IsOptional()
  @IsString()
  primerApellidoNoti?: string | '';

  @ApiPropertyOptional({ example: 'OTRO' })
  @IsOptional()
  @IsString()
  segundoApellidoNoti?: string | '';

  @ApiProperty({ example: '77855561' })
  @IsOptional()
  @IsString()
  telefonoNoti?: string | '';

  @ApiProperty({ example: '2002-05-07' })
  @IsOptional()
  fechaNaciNoti?: Date | '';

  @ApiProperty({ example: '53534534' })
  @IsOptional()
  @IsString()
  nroDocumentoNoti?: string;

  @ApiPropertyOptional({ example: '23432' })
  @IsOptional()
  @IsString()
  instanciaClasi?: string | '';

  @ApiPropertyOptional({ example: '23423' })
  @IsOptional()
  @IsString()
  clasifiFinal?: string | '';

  // array
  @ApiPropertyOptional({
    example: [
      {
        criterioId: '1',
        nombreCriterio: 'MUERTE',
      },
    ],
  })
  @IsOptional()
  esavicriterios?: CrearCriterioDto[];

  @ApiPropertyOptional({
    example: [
      {
        sintomasId: '15',
        cieAlfa: 'A04.4',
        cieDescripcion:
          'Otras infecciones intestinales debidas a Escherichia coli',
      },
    ],
  })
  @IsOptional()
  esavisintomas?: CrearSintomasDto[];

  @ApiPropertyOptional({
    example: [
      {
        sintomaId: '15',
        sintomaCodigo: 'A04.4',
        sintomaDescri:
          'Otras infecciones intestinales debidas a Escherichia coli',
        fechaAnte: '2000-05-10',
        medicamentoId: '2',
        medicamentoCodigo: 'A34',
        medicamentoDescri: 'FSAFD',
        embarazo: 'NO',
        observacion: 'NINGUNA',
      },
    ],
  })
  @IsOptional()
  antecedentes?: CrearAntecedenteDto[] | '';
}
