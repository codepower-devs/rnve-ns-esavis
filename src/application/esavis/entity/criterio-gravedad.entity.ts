
import dotenv from 'dotenv';
import {
    Column,
    Entity,
    JoinColumn,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Esavi } from './esavi.entity';
import { EsaviCriterios } from './esavi_criterios.entity';

dotenv.config();

// @Check(UtilService.buildStatusCheck(EsaviEstado))
@Entity({ name: 'criterio_gravedad', schema: process.env.DB_SCHEMA_ESAVIS })
export class CriterioGravedad {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla criterio de gravedad',
  })
  id: string;

  @Column({
    name: 'nombre_criterio',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Nombre del criterio de gravedad',
  })
  nombreCriterio: string | '';

  @Column({
    name: 'descripcion',
    type: 'date',
    nullable: true,
    comment: 'Descripcion del criterio de gravedad',
  })
  descripcion: Date | '';

//   constructor(data?: Partial<CriterioGravedad>) {
//     super(data);
//   }

  // @OneToMany(() => EsaviCriterios, (elem) => elem.criterioGravedad)
  // @JoinColumn({ name: 'id', referencedColumnName: 'criterio_id' })
  // esavicriterios: EsaviCriterios;


}
