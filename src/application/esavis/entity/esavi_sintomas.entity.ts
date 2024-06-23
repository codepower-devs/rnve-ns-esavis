import dotenv from 'dotenv';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Esavi } from './esavi.entity';

dotenv.config();

@Entity({ name: 'esavis_sintomas', schema: process.env.DB_SCHEMA_ESAVIS })
export class EsaviSintomas {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla de Esavisintomas',
  })
  id: string;

  @Column({
    name: 'esavi_id',
    type: 'int',
    comment: 'Clave foránea que referencia la tabla de esavis',
  })
  esaviId: string;

  @Column({
    name: 'sintoma_id',
    type: 'int',
    comment: 'Id de los sintomas',
  })
  sintomasId: string;

  @Column({
    name: 'cie_alfa',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Cie alda de sintomas',
  })
  cieAlfa: string;

  @Column({
    name: 'cie_descripcion',
    type: 'varchar',
    nullable: true,
    comment: 'Cie descripcionde sintomas',
  })
  cieDescripcion: string;

  @ManyToOne(() => Esavi, (elem) => elem.esavisintomas)
  @JoinColumn({ name: 'esavi_id', referencedColumnName: 'id' })
  esavi: Esavi;

  // @ManyToOne(() => CriterioGravedad, (elem) => elem.esavicriterios)
  // @JoinColumn({ name: 'criterio_id', referencedColumnName: 'id' })
  // criterioGravedad: CriterioGravedad

  constructor(data?: Partial<EsaviSintomas>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
