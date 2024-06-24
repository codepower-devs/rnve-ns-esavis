import { BaseController } from '@/common/base';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { ParamIdDto } from '@/common/dto/params-id.dto';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GlobalesService } from '../service/globales.service';
import { ParamGrupoDto } from '@/application/parametro/dto';
import { CrearGlobalesDto } from '../dto/crear-globales.dto';
import { ActualizarGlobalesDto } from '../dto/actualizar-globales.dto';

@Controller('catalogosesavi')
export class GlobalesController extends BaseController {
  constructor(private catalogoervicio: GlobalesService) {
    super();
  }

  @MessagePattern({ cmd: 'listar-catalogos-esavi' })
  async listar(@Payload() paginacionQueryDto: PaginacionQueryDto) {
    const result = await this.catalogoervicio.listar(paginacionQueryDto);
    return this.successListRows(result);
  }

  @MessagePattern({ cmd: 'listar-catalogos-grupo-esavi' })
  async listarPorGrupo(@Payload() params: ParamGrupoDto) {
    console.log(params);
    const { grupo } = params;
    const result = await this.catalogoervicio.listarPorGrupo(grupo);
    return this.successList(result);
  }

  @MessagePattern({ cmd: 'crear-catalogo-esavi' })
  async crear(@Payload() catalogoDto: CrearGlobalesDto) {
    console.log(catalogoDto);
    const result = await this.catalogoervicio.crear(catalogoDto);
    return this.successCreate(result);
  }

  @MessagePattern({ cmd: 'actualizar-catalogo-esavi' })
  async actualizar(@Payload() catalogoDto: ActualizarGlobalesDto) {
    const result = await this.catalogoervicio.actualizarDatos(catalogoDto);
    return this.successUpdate(result);
  }

  @MessagePattern({ cmd: 'activar-catalogo-esavi' })
  async activar(@Payload() params: ParamIdDto) {
    const { id } = params;
    const result = await this.catalogoervicio.activar(id);
    return this.successUpdate(result);
  }

  @MessagePattern({ cmd: 'inactivar-catalogo-esavi' })
  async inactivar(@Payload() params: ParamIdDto) {
    const { id } = params;
    const result = await this.catalogoervicio.inactivar(id);
    return this.successUpdate(result);
  }
}
