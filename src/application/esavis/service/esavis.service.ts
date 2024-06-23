import { BaseController } from '@/common/base';
import {
  Inject,
  Injectable,
  PreconditionFailedException,
} from '@nestjs/common';
import { CrearAntecedenteDto } from '../dto/crear-antecedente.dto';
import { CrearCriterioDto } from '../dto/crear-criterios.dto';
import { CrearEsaviDto } from '../dto/crear-esavi.dto';
import { CrearSintomasDto } from '../dto/crear-sintomas.dto';
import { EsavisRepository } from '../repository';
import { ActualizarEsaviDto } from '../dto/actualizar-esavi.dto';
import { FiltroAvanzadoEsaviDto } from '../dto/filtro-avanzado-esavis.dto';
import { ParamIdDto } from '@/common/dto/params-id.dto';

@Injectable()
export class EsavisService extends BaseController {
  constructor(
    @Inject(EsavisRepository)
    private esavisRepositorio: EsavisRepository,
  ) {
    super();
  }

  async crearesaviservice(esaviDto: CrearEsaviDto) {
    const esaviexiste = await this.esavisRepositorio.buscarCreadoIdporVacuna(
      esaviDto.vacunaId as string,
    );
    if (esaviexiste) {
      // const body = {
      //   finalizado: false,
      //   mensaje: 'Ya existe un ESAVI referente a la vacuna del paciente.',
      //   codigo: 412
      // }
      // return body;
      return this.errorRespuesta(
        'Ya existe un ESAVI referente a la vacuna del paciente.',
      );
    }
    try {
      const {
        nombres,
        primerApellido,
        segundoApellido,
        vacunaId,
        antecedentes,
      } = esaviDto;
      const caseArmado = await this.esavisRepositorio.armarcase(
        nombres as string,
        primerApellido as string,
        segundoApellido as string,
        vacunaId,
      );
      esaviDto.caseId = caseArmado;
      const esavicreado = await this.esavisRepositorio.crearesavi(esaviDto);

      const criterios = await this.esavisRepositorio.crearcriterios(
        esavicreado.id,
        esaviDto.esavicriterios as CrearCriterioDto[],
      );
      const sintomas = await this.esavisRepositorio.crearsintomas(
        esavicreado.id,
        esaviDto.esavisintomas as CrearSintomasDto[],
      );

      if (antecedentes && antecedentes.length > 0) {
        const antecedentes = await this.esavisRepositorio.crearantecedentes(
          esavicreado.id,
          esaviDto.antecedentes as CrearAntecedenteDto[],
        );
      }
      return this.successCreate(esavicreado);
    } catch (error) {}
  }

  // async actualizar(
  //   persona: ActualizarEsaviDto,
  // ) {
  //   const { usuarios, ...info } = persona;
  //   const datospersonaActualizar = new Persona({
  //     ...info,
  //   });
  //   await (
  //     transaction?.getRepository(Persona) ??
  //     this.dataSource.getRepository(Persona)
  //   )
  //     .createQueryBuilder()
  //     .update(Persona)
  //     .set(datospersonaActualizar)
  //     .where('id = :idd', {
  //       idd: persona.id,
  //     })
  //     .execute();
  //   const updatedPersona = await this.buscarPersonaIdconRoles(
  //     persona.id as string,
  //   );
  //   console.log(updatedPersona);

  //   return updatedPersona;
  // }

  async filtroEsaviavanzadoservice(filtro: FiltroAvanzadoEsaviDto) {
    console.log(filtro);
    const personains =
      await this.esavisRepositorio.filtroesavisavanzado(filtro);
    return this.successListRows(personains);
  }  

  async obtenerUnesaviIdservice(idesavi: string) {
    const personains =
      await this.esavisRepositorio.buscarUnEsaviId(idesavi);
    return this.success(personains);
  }
}
