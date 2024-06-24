
import { AuditoriaEntity } from '@/common/entity/auditoria.entity';
import { UtilService } from '@/common/lib/util.service';
import dotenv from 'dotenv';
import {
    BeforeInsert,
    Check,
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';
import { GlobalesEstado } from '../constant';
  
  dotenv.config()
  
@Check(UtilService.buildStatusCheck(GlobalesEstado))
  @Entity({ name: 'catalogos_genericos', schema: process.env.DB_SCHEMA_ESAVIS })
  export class CatalogosGenericos extends AuditoriaEntity{
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
        comment: 'Clave primaria de la tabla Parámetro',
      })
      id: string;
    
      @Column({
        type: 'bigint',
        name: 'tabla_id',
        comment: 'Clave foránea de la tabla Tabla',
      })
      tablaId: number;

      @Column({
        type: 'bigint',
        name: 'catalogo_id',
        comment: 'Clave foránea de la tabla Catálogo',
      })
      catalogoId: number; 
    
      @Column({ length: 100, type: 'varchar', comment: 'Grupo de parámetro' })
      grupo: string;
    
      @Column({ length: 255, type: 'varchar', comment: 'Descripción de parámetro' })
      descripcion: string;

    constructor(data?: Partial<CatalogosGenericos>) {
        super(data);
    }
  
    @BeforeInsert()
    insertarEstado() {
      this.estado = this.estado || GlobalesEstado.ACTIVO;
    }
  }
  