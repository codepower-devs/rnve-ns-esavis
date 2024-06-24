import dotenv from 'dotenv';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

dotenv.config();

@Entity({ name: 'liname', schema: process.env.DB_SCHEMA_ESAVIS })
export class Liname {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de liname',
  })
  id: string;

  @Column({
    name: 'codigo',
    type: 'varchar',
    nullable: true,
    comment: 'codigo',
  })
  codigo: string;

  @Column({
    name: 'medicamento',
    type: 'varchar',
    comment: 'medicamento',
  })
  medicamento: string;

  @Column({
    name: 'forma_farma',
    type: 'varchar',
    nullable: true,
    comment: 'forma farmaceutica',
  })
  formaFarma: string;

  @Column({
    name: 'concentracion',
    type: 'varchar',
    nullable: true,
    comment: 'concetrnacion',
  })
  concentracion: string;

  @Column({
    name: 'clasifica',
    type: 'varchar',
    nullable: true,
    comment: 'tipo del cie10',
  })
  clasifica: string;

  @Column({
    name: 'restri',
    type: 'varchar',
    nullable: true,
    comment: 'Nombre del criterio',
  })
  restri?: string | null;

  constructor(data?: Partial<Liname>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
