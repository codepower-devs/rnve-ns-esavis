import { BaseService } from '@/common/base/base-service';
import { Messages } from '@/common/constants/response-messages';
import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';


import { RpcException } from '@nestjs/microservices';
import { GlobalesEstado } from '../constant';
import { ActualizarGlobalesDto } from '../dto/actualizar-globales.dto';
import { CrearGlobalesDto } from '../dto/crear-globales.dto';
import { GlobalesRepository } from '../repository/globales.repository';

@Injectable()
export class GlobalesService extends BaseService {
  constructor(
    @Inject(GlobalesRepository)
    private catalogoRepositorio: GlobalesRepository,
  ) {
    super();
  }

  async crear(catalogoDto: CrearGlobalesDto) {
    return await this.catalogoRepositorio.crear(catalogoDto);
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    return await this.catalogoRepositorio.listar(paginacionQueryDto);
  }

  async listarPorGrupo(grupo: string) {
    return await this.catalogoRepositorio.listarPorGrupo(grupo);
  }

  async actualizarDatos(catalogoDto: ActualizarGlobalesDto) {
    const { id } = catalogoDto;
    const catalogo = await this.catalogoRepositorio.buscarPorId(id);
    if (!catalogo) {
      throw new RpcException({
        message: Messages.EXCEPTION_NOT_FOUND,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    await this.catalogoRepositorio.actualizar(id, catalogoDto);
    return { id };
  }

  async activar(id: string) {
    const catalogo = await this.catalogoRepositorio.buscarPorId(id);
    if (!catalogo) {
      throw new RpcException({
        message: Messages.EXCEPTION_NOT_FOUND,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    const catalogoDto = new ActualizarGlobalesDto();
    catalogoDto.estado = GlobalesEstado.ACTIVO;
    await this.catalogoRepositorio.actualizar(id, catalogoDto);
    return {
      id: id,
      estado: catalogoDto.estado,
    };
  }

  async inactivar(id: string) {
    const catalogo = await this.catalogoRepositorio.buscarPorId(id);
    if (!catalogo) {
      throw new RpcException({
        message: Messages.EXCEPTION_NOT_FOUND,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    const catalogoDto = new ActualizarGlobalesDto();
    catalogoDto.estado = GlobalesEstado.INACTIVO;
    await this.catalogoRepositorio.actualizar(id, catalogoDto);
    return {
      id: id,
      estado: catalogoDto.estado,
    };
  }
}
