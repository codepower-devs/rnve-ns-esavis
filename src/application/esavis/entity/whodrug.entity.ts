
import dotenv from 'dotenv';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

dotenv.config();

@Entity({ name: 'whodrug', schema: process.env.DB_SCHEMA_ESAVIS })
export class Whodrug {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla whodrug',
  })
  id: string;

  @Column({
    name: 'nombre_whodrug',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Nombre de whodrug',
  })
  nombreWhodrug: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Descripcion de whodrug',
  })
  descripcion: string | '';

}
