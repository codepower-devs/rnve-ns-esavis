import { BaseController } from '@/common/base';
import { Controller } from '@nestjs/common';
import { EsavisService } from '../service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { CrearEsaviDto } from '../dto/crear-esavi.dto';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ActualizarEsaviDto } from '../dto/actualizar-esavi.dto';
import { FiltroAvanzadoEsaviDto } from '../dto/filtro-avanzado-esavis.dto';
import { ObtenerNombreDto } from '../dto/obtener-lista-esavi.dto';

@Controller('esavis')
export class EsavisController extends BaseController {
  constructor(private esavisService: EsavisService) {
    super();
  }

  @MessagePattern({ cmd: 'crear-esavi' })
  async crearcontroller(@Payload() esaviDto: CrearEsaviDto) {
    const result = await this.esavisService.crearesaviservice(esaviDto);
    // return this.successCreate(result);
    return result;
  }

  @MessagePattern({ cmd: 'actualizar-esavi' })
  async actualizarcontroller(@Payload() esaviDto: ActualizarEsaviDto) {
    const result = await this.esavisService.actualizaresaviservice(esaviDto);
    return result;
  }

  @MessagePattern({ cmd: 'filtro-avanzado-esavis' })
  async filtroesaviAvanController(@Payload() filtro: FiltroAvanzadoEsaviDto) {
    console.log(filtro);
    const result =
      await this.esavisService.filtroEsaviavanzadoservice(filtro);
    return result;
  }

  @MessagePattern({ cmd: 'obtener-un-esavi' })
  async getonecontroller(@Payload() esaviDto: ParamIdDto) {
    const { id } = esaviDto;
    const result = await this.esavisService.obtenerUnesaviIdservice(
        id
    );
    return result;
  }

  @MessagePattern({ cmd: 'obtener-lista-cie' })
  async getCIEcontroller(@Payload() esaviDto: ObtenerNombreDto) {
    const { nombre } = esaviDto;
    const result = await this.esavisService.obtenerListaCieservice(
      nombre as string
    );
    return result;
  }

  @MessagePattern({ cmd: 'obtener-lista-liname' })
  async getLINAMEcontroller(@Payload() esaviDto: ObtenerNombreDto) {
    const { nombre } = esaviDto;
    const result = await this.esavisService.obtenerListaLinameservice(
      nombre as string
    );
    return result;
  }

}
