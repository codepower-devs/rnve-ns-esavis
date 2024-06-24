import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { EsaviCriterios } from '../entity/esavi_criterios.entity';

import { ActualizarEsaviDto } from '../dto/actualizar-esavi.dto';
import { CrearEsaviDto } from '../dto/crear-esavi.dto';
import { Esavi } from '../entity';
import { EsaviSintomas } from '../entity/esavi_sintomas.entity';
import { CrearCriterioDto } from '../dto/crear-criterios.dto';
import { CrearSintomasDto } from '../dto/crear-sintomas.dto';
import { CrearAntecedenteDto } from '../dto/crear-antecedente.dto';
import { Antecedentes } from '../entity/antecedentes.entity';
import { nroDocumento } from '../../../common/validation/nro-documento.validator';
import { FiltroAvanzadoEsaviDto } from '../dto/filtro-avanzado-esavis.dto';
import { Cie10 } from '../entity/lista_cie.entity';
import { Liname } from '../entity/lista_liname.entity';

@Injectable()
export class EsavisRepository {
  constructor(private dataSource: DataSource) {}

  async crearesavi(esaviDto: CrearEsaviDto) {
    console.log(esaviDto);
    return await this.dataSource.getRepository(Esavi).save(
      new Esavi({
        caseId: esaviDto?.caseId,
        personaId: esaviDto.personaId,
        pacienteId: esaviDto.pacienteId,
        vacunaId: esaviDto.vacunaId,
        nombres: esaviDto.nombres,
        primerApellido: esaviDto.primerApellido,
        segundoApellido: esaviDto.segundoApellido,
        nroDocumento: esaviDto.nroDocumento,
        genero: esaviDto.genero,
        fechaNaci: esaviDto.fechaNaci,
        edad: esaviDto.edad,
        anteAlergias: esaviDto.anteAlergias,
        cualCuadro: esaviDto.cualCuadro,
        fum: esaviDto.fum != '' ? esaviDto.fum : null,
        fechaSintomas: esaviDto.fechaSintomas,
        desenlaceEsavi: '0',
        idNoti: esaviDto.idNoti == '' ? '0' : esaviDto.idNoti,
        profesionNoti: esaviDto.profesionNoti,
        nombresNoti: esaviDto.nombresNoti,
        primerApellidoNoti: esaviDto.primerApellidoNoti,
        segundoApellidoNoti: esaviDto.segundoApellidoNoti,
        telefonoNoti: esaviDto.telefonoNoti,
        fechaNaciNoti: esaviDto.fechaNaciNoti,
        nroDocumentoNoti: esaviDto.nroDocumentoNoti,
        instanciaClasi: '0',
        clasifiFinal: '0',
      }),
    );
  }

  async crearcriterios(idEsavi: string, criterios: CrearCriterioDto[]) {
    const esaviCriterios = criterios.map((elemento) => {
      const esavi = new Esavi();
      esavi.id = idEsavi;

      const esaviCrite = new EsaviCriterios();
      esaviCrite.esavi = esavi;
      esaviCrite.esaviId = esavi.id;
      esaviCrite.criterioId = elemento.criterioId;
      esaviCrite.nombreCriterio = elemento.nombreCriterio;

      return esaviCrite;
    });
    return await this.dataSource
      .getRepository(EsaviCriterios)
      .save(esaviCriterios);
  }

  async crearsintomas(idEsavi: string, sintomas: CrearSintomasDto[]) {
    const esaviSintomas = sintomas.map((elemento) => {
      const esavi = new Esavi();
      esavi.id = idEsavi;

      const esaviSinto = new EsaviSintomas();
      esaviSinto.esavi = esavi;
      esaviSinto.esaviId = esavi.id;
      esaviSinto.sintomasId = elemento.sintomasId;
      esaviSinto.cieAlfa = elemento.cieAlfa;
      esaviSinto.cieDescripcion = elemento.cieDescripcion;

      return esaviSinto;
    });
    return await this.dataSource
      .getRepository(EsaviSintomas)
      .save(esaviSintomas);
  }

  async crearantecedentes(idEsavi: string, sintomas: CrearAntecedenteDto[]) {
    const antece = sintomas.map((elemento) => {
      const esavi = new Esavi();
      esavi.id = idEsavi;

      const esaviSinto = new Antecedentes();
      esaviSinto.esavi = esavi;
      esaviSinto.esaviId = esavi.id;

      esaviSinto.sintomaId = elemento.sintomaId;
      esaviSinto.sintomaCodigo = elemento.sintomaCodigo;
      esaviSinto.sintomaDescri = elemento.sintomaDescri;

      esaviSinto.fechaAnte =
        elemento.fechaAnte != '' ? elemento.fechaAnte : null;

      esaviSinto.medicamentoId =
        elemento.medicamentoId != '' ? elemento.medicamentoId : '0';
      esaviSinto.medicamentoCodigo = elemento.medicamentoCodigo;
      esaviSinto.medicamentoDescri = elemento.medicamentoDescri;

      esaviSinto.embarazo = elemento.embarazo;
      esaviSinto.observacion = elemento.observacion;

      return esaviSinto;
    });
    return await this.dataSource.getRepository(Antecedentes).save(antece);
  }
  async armarcase(
    nombre: string,
    primerapellido: string,
    segundoapellido: string,
    idvacuna: string,
  ) {
    const pri = nombre === '' ? nombre : nombre;
    const seg = primerapellido === '' ? primerapellido : primerapellido;
    const ter = segundoapellido === '' ? segundoapellido : segundoapellido;

    const armado = `${pri.charAt(0).toLowerCase()}${seg.charAt(0).toLowerCase()}${ter.charAt(0).toLowerCase()}${idvacuna.toLowerCase()}`;
    return armado.toUpperCase();
  }

  async buscarCreadoIdporVacuna(id: string) {
    return await this.dataSource
      .getRepository(Esavi)
      .createQueryBuilder('esavi')
      .where('esavi.vacuna_id = :idvacuna', { idvacuna: id })
      .getOne();
  }

  async buscarunesaviporID(id: string) {
    return await this.dataSource
      .getRepository(Esavi)
      .createQueryBuilder('esavi')
      .where('esavi.id = :ides', { ides: id })
      .getOne();
  }

  async actualizaresavi(esaviDto: ActualizarEsaviDto) {
console.log(esaviDto);
try {
  const repo = this.dataSource.getRepository(Esavi);
    const datosActualizar = {
      cualCuadro: esaviDto?.cualCuadro,
      fum: esaviDto?.fum,
      fechaSintomas: esaviDto?.fechaSintomas,
      desenlaceEsavi: esaviDto?.desenlaceEsavi,
      profesionNoti: esaviDto?.profesionNoti,
      nombresNoti: esaviDto?.nombresNoti,
      primerApellidoNoti: esaviDto?.primerApellidoNoti,
      segundoApellidoNoti: esaviDto?.segundoApellidoNoti,
      telefonoNoti: esaviDto?.telefonoNoti,
      fechaNaciNoti: esaviDto?.fechaNaciNoti,
      nroDocumentoNoti: esaviDto.nroDocumentoNoti,
      instanciaClasi: esaviDto?.instanciaClasi,
      clasifiFinal: esaviDto?.clasifiFinal,
    };
    await repo.update(esaviDto.id as string, datosActualizar);

    const obteneresavi = await this.buscarunesaviporID(esaviDto.id as string);
    return obteneresavi;
    // return "";
} catch (error) {
  console.log(error);
}
    
  }

  async filtroesavisavanzado(paginacionQueryDto: FiltroAvanzadoEsaviDto) {
    const {
      limite,
      saltar,
      orden,
      sentido,
      caseId,
      nombres,
      primerApellido,
      segundoApellido,
      nroDocumento,
    } = paginacionQueryDto;

    const query = this.dataSource
      .getRepository(Esavi)
      .createQueryBuilder('esavi')
      .innerJoinAndSelect('esavi.esavicriterios', 'criterios')
      .innerJoinAndSelect('esavi.esavisintomas', 'sintomas')
      .innerJoinAndSelect('esavi.antecendentes', 'antece')
      .select([
        'esavi.caseId',
        'esavi.nombres',
        'esavi.primerApellido',
        'esavi.segundoApellido',
        'esavi.nroDocumento',
        'criterios.id',
        'criterios.nombreCriterio',
        'sintomas.id',
        'sintomas.cieAlfa',
        'sintomas.cieDescripcion',
        'antece.id',
        'antece.sintomaDescri',
        'antece.medicamentoDescri',
      ])
      // .take(limite)
      // .skip(saltar);

    switch (orden) {
      case 'caseId':
        query.addOrderBy('esavi.caseId', sentido);
        break;
      case 'nombres':
        query.addOrderBy('esavi.nombres', sentido);
        break;
      case 'primerApellido':
        query.addOrderBy('esavi.primerApellido', sentido);
        break;
      case 'segundoApellido':
        query.addOrderBy('esavi.segundoApellido', sentido);
        break;
      case 'nroDocumento':
        query.addOrderBy('esavi.nroDocumento', sentido);
        break;
      default:
        query.addOrderBy('esavi.id', 'ASC');
    }
    const avanzado = [
      caseId,
      nombres,
      primerApellido,
      segundoApellido,
      nroDocumento,
    ].some((value) => value !== null && value !== undefined);

    if (avanzado) {
      if (caseId && caseId.length > 0) {
        query.orWhere('esavi.caseId ilike :aa', {
          aa: `%${caseId}%`,
        });
      }
      if (nombres && nombres.length > 0) {
        query.orWhere('esavi.nombres ilike :bb', {
          bb: `%${nombres}%`,
        });
      }
      if (primerApellido && primerApellido.length > 0) {
        query.orWhere('esavi.primerApellido ilike :cc', {
          cc: `%${primerApellido}%`,
        });
      }
      if (segundoApellido && segundoApellido.length > 0) {
        query.orWhere('esavi.segundoApellido ilike :dd', {
          dd: `%${segundoApellido}%`,
        });
      }
      if (nroDocumento && nroDocumento.length > 0) {
        query.orWhere('esavi.nroDocumento ilike :dd', {
          dd: `%${nroDocumento}%`,
        });
      }
    }
    return await query.getManyAndCount();
  }
  async buscarUnEsaviId(id: string) {
    return await this.dataSource
      .getRepository(Esavi)
      .createQueryBuilder('esavi')
      .innerJoinAndSelect('esavi.esavicriterios', 'criterios')
      .innerJoinAndSelect('esavi.esavisintomas', 'sintomas')
      .innerJoinAndSelect('esavi.antecendentes', 'antece')
      .where('esavi.id = :ides', { ides: id })
      .getOne();
  }
//paralos listado
  async obteneCieporDescripcion(descrip: string) {
    return await this.dataSource
      .getRepository(Cie10)
      .createQueryBuilder('cie_10')
      .where('LOWER(cie_10.descripcion) like LOWER(:ides)', { ides: `%${descrip}%` })
      .getMany();
  }

  async obteneLinameporDescripcion(descrip: string) {
    return await this.dataSource
      .getRepository(Liname)
      .createQueryBuilder('liname')
      .where('LOWER(liname.medicamento) like LOWER(:ides)', { ides: `%${descrip}%` })
      .getMany();
  }

}
