
import dotenv from 'dotenv';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

dotenv.config();

@Entity({ name: 'meddra', schema: process.env.DB_SCHEMA_ESAVIS })
export class Meddra {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla meddra',
  })
  id: string;

  @Column({
    name: 'nombre_meddra',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Nombre de meddra',
  })
  nombreMeddra: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Descripcion de meddra',
  })
  descripcion: string | '';

}
