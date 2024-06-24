import { BaseController } from '@/common/base';
import {
  HttpStatus,
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
import { RpcException } from '@nestjs/microservices';
import { Messages } from '@/common/constants/response-messages';

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
      // throw new RpcException({
      //   message: "Ya existe un ESAVI referente a la vacuna del paciente.",
      //   status: HttpStatus.BAD_REQUEST,
      // });
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

  async actualizaresaviservice(esavi: ActualizarEsaviDto) {
    const esavaactu = await this.esavisRepositorio.actualizaresavi(esavi);
    return this.successUpdate(esavaactu);
  }

  async filtroEsaviavanzadoservice(filtro: FiltroAvanzadoEsaviDto) {
    const personains =
      await this.esavisRepositorio.filtroesavisavanzado(filtro);
    return this.successListRows(personains);
  }

  async obtenerUnesaviIdservice(idesavi: string) {
    const personains = await this.esavisRepositorio.buscarUnEsaviId(idesavi);
    return this.success(personains);
  }
  async obtenerListaCieservice(nombre: string) {
    const personains =
      await this.esavisRepositorio.obteneCieporDescripcion(nombre);
    return this.successList(personains);
  }
  async obtenerListaLinameservice(nombre: string) {
    const personains =
      await this.esavisRepositorio.obteneLinameporDescripcion(nombre);
    return this.successList(personains);
  }
}
