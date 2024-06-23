
import dotenv from 'dotenv'
import {
    Check,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm'
import { Esavi } from './esavi.entity'
import { CriterioGravedad } from './criterio-gravedad.entity'

  
  dotenv.config()
  
  @Entity({ name: 'esavis_criterios', schema: process.env.DB_SCHEMA_ESAVIS })
  export class EsaviCriterios {
    @PrimaryGeneratedColumn({
      type: 'bigint',
      name: 'id',
      comment: 'Clave primaria de la tabla de Esaviscriterios',
    })
    id: string
  
    @Column({
      name: 'esavi_id',
      type: 'int',
      comment: 'Clave foránea que referencia la tabla de esavis',
    })
    esaviId: string
  
    @Column({
      name: 'criterio_id',
      type: 'int',
      comment: 'Clave foránea que referencia la tabla criterios',
    })
    criterioId: string

    @Column({
      name: 'nombre_criterio',
      length: 100,
      type: 'varchar',
      nullable: true,
      comment: 'Nombre del criterio',
    })
    nombreCriterio: string
  
    @ManyToOne(() => Esavi, (elem) => elem.esavicriterios)
    @JoinColumn({ name: 'esavi_id', referencedColumnName: 'id' })
    esavi: Esavi
  
    // @ManyToOne(() => CriterioGravedad, (elem) => elem.esavicriterios)
    // @JoinColumn({ name: 'criterio_id', referencedColumnName: 'id' })
    // criterioGravedad: CriterioGravedad

    constructor(data?: Partial<EsaviCriterios>) {
      if (data) {
        Object.assign(this, data);
      }
    }
  
  }
  