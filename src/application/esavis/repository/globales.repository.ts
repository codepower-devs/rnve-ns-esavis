import { PaginacionQueryDto } from '@/common/dto/paginacion-query.dto';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Brackets, DataSource } from 'typeorm';
import { CatalogosGenericos } from '../entity/catalogos_genericos.entity';
import { CrearGlobalesDto } from '../dto/crear-globales.dto';
import { ActualizarGlobalesDto } from '../dto/actualizar-globales.dto';


@Injectable()
export class GlobalesRepository {
  constructor(private dataSource: DataSource) {}

  async buscarPorId(id: string) {
    return await this.dataSource
      .getRepository(CatalogosGenericos)
      .createQueryBuilder('catalogosGenericos')
      .where({
        id: id,
      })
      .getOne();
  }

  async actualizar(id: string, parametroDto: ActualizarGlobalesDto) {
    const datosActualizar = new CatalogosGenericos({
      ...parametroDto,
    });
    try {
      return await this.dataSource
        .getRepository(CatalogosGenericos)
        .update(id, datosActualizar);
    } catch (error) {
      console.log(error);
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }

  async listar(paginacionQueryDto: PaginacionQueryDto) {
    const { limite, saltar, filtro, orden, sentido } = paginacionQueryDto;
    const query = this.dataSource
      .getRepository(CatalogosGenericos)
      .createQueryBuilder('catalogos_genericos')
      .select([
        'catalogos_genericos.id',
        'catalogos_genericos.grupo',
        'catalogos_genericos.descripcion',
        'catalogos_genericos.catalogoId',
        'catalogos_genericos.tablaId',
      ])
      .take(limite)
      .skip(saltar);

    switch (orden) {
      case 'grupo':
        query.addOrderBy('catalogos_genericos.grupo', sentido);
        break;
      case 'descripcion':
        query.addOrderBy('catalogos_genericos.descripcion', sentido);
        break;
      case 'estado':
        query.addOrderBy('catalogos_genericos.estado', sentido);
        break;
      default:
        query.orderBy('catalogos_genericos.id', 'ASC');
    }

    if (filtro) {
      query.andWhere(
        new Brackets((qb) => {
          qb.orWhere('catalogos_genericos.grupo like :filtro', {
            filtro: `%${filtro}%`,
          });
          qb.orWhere('catalogos_genericos.descripcion ilike :filtro', {
            filtro: `%${filtro}%`,
          });
        }),
      );
    }
    return await query.getManyAndCount();
  }

  async listarPorGrupo(grupo: string) {
    console.log(grupo);
    return await this.dataSource
      .getRepository(CatalogosGenericos)
      .createQueryBuilder('catalogos_genericos')
      .select([
        'catalogos_genericos.id',
        'catalogos_genericos.grupo',
        'catalogos_genericos.descripcion',
        'catalogos_genericos.catalogoId',
        'catalogos_genericos.tablaId',
      ])
      .where('catalogos_genericos.tablaId = :grupo', {
        grupo,
      })
      .getMany();
  }

  async crear(parametroDto: CrearGlobalesDto) {
    try {
      const { grupo, descripcion, usuarioCreacion, catalogoId, tablaId } =
        parametroDto;

      const parametro = new CatalogosGenericos();

      parametro.tablaId = tablaId;
      parametro.catalogoId = catalogoId;
      parametro.grupo = grupo;
      parametro.descripcion = descripcion;
      parametro.usuarioCreacion = usuarioCreacion;

      return await this.dataSource.getRepository(CatalogosGenericos).save(parametro);
    } catch (error) {
      console.log(error);
      throw new RpcException({
        message: error.message,
        status: error.status,
      });
    }
  }
}
