
import dotenv from 'dotenv';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Esavi } from './esavi.entity';

dotenv.config();

@Entity({ name: 'antecedentes', schema: process.env.DB_SCHEMA_ESAVIS })
export class Antecedentes {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla antecedentes',
  })
  id: string;

  @Column({
    name: 'sintoma_id',
    type: 'int',
    comment: 'Id del sintoma',
  })
  sintomaId: string;

  @Column({
    name: 'sintoma_codigo',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Nombre del sintoma',
  })
  sintomaCodigo: string | '';

  @Column({
    name: 'sintoma_descri',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Descripcion del sintoma',
  })
  sintomaDescri: string | '';

  @Column({
    name: 'fecha_ante',
    type: 'date',
    nullable: true,
    comment: 'Fecha del antecente',
  })
  fechaAnte: Date | null | '';

  @Column({
    name: 'medicamento_id',
    type: 'int',
    comment: 'Id del medicamento',
  })
  medicamentoId: string | '';

  @Column({
    name: 'medicamento_codigo',
    type: 'varchar',
    nullable: true,
    length: 100,
    comment: 'Nombre del medicamento',
  })
  medicamentoCodigo: string | '';

  @Column({
    name: 'medicamento_descri',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Descripcion del medicamento',
  })
  medicamentoDescri: string | '';

  @Column({
    name: 'embarazo',
    length: 50,
    type: 'varchar',
    nullable: true,
    comment: 'SI es embarazo y NO si no lo es',
  })
  embarazo: string;

  @Column({
    name: 'observacion',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Una observacion referente al antecedente',
  })
  observacion: string | '';

  @Column({
    name: 'esavi_id',
    type: 'int',
    comment: 'El id del esavi',
  })
  esaviId: string;

  @ManyToOne(() => Esavi, (elem) => elem.antecendentes)
  @JoinColumn({ name: 'esavi_id', referencedColumnName: 'id' })
  esavi: Esavi

  constructor(data?: Partial<Antecedentes>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
