import dotenv from 'dotenv';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

dotenv.config();

@Entity({ name: 'cie_10', schema: process.env.DB_SCHEMA_ESAVIS })
export class Cie10 {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla de Esaviscriterios',
  })
  id: string;

  @Column({
    name: 'codigo',
    type: 'int',
    comment: 'codigo',
  })
  codigo: string;

  @Column({
    name: 'alfa',
    type: 'varchar',
    comment: 'codigo alfa',
  })
  alfa: string;

  @Column({
    name: 'descripcion',
    type: 'varchar',
    nullable: true,
    comment: 'descripcion del cie10',
  })
  descripcion: string;

  @Column({
    name: 'grupo',
    type: 'int',
    comment: 'grupo en entero',
  })
  grupo: string;

  @Column({
    name: 'tipo',
    type: 'varchar',
    nullable: true,
    comment: 'tipo del cie10',
  })
  tipo: string;

  @Column({
    name: 'otra_descripcion',
    type: 'varchar',
    nullable: true,
    comment: 'Nombre del criterio',
  })
  otraDescripcion?: string | null;

  constructor(data?: Partial<Cie10>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
