import dotenv from 'dotenv';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Antecedentes } from './antecedentes.entity';
import { EsaviCriterios } from './esavi_criterios.entity';
import { EsaviSintomas } from './esavi_sintomas.entity';

dotenv.config();

@Entity({ name: 'esavi', schema: process.env.DB_SCHEMA_ESAVIS })
export class Esavi {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
    comment: 'Clave primaria de la tabla Esavi',
  })
  id: string;

  @Column({
    name: 'case_id',
    type: 'varchar',
    length: 100,
    nullable: true,
    comment: 'Case de paciente',
  })
  caseId: string;

  @Column({
    name: 'persona_id',
    type: 'int',
    comment: 'Id de la persona',
  })
  personaId?: string | '';

  @Column({
    name: 'paciente_id',
    type: 'int',
    comment: 'Id del paciente',
  })
  pacienteId: string;

  @Column({
    name: 'vacuna_id',
    type: 'int',
    comment: 'Id de la vacuna',
  })
  vacunaId: string;

  @Column({
    name: 'nombres',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Nombre del paciente',
  })
  nombres: string;

  @Column({
    name: 'primer_apellido',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Primer apellido del paciente',
  })
  primerApellido: string;

  @Column({
    name: 'segundo_apellido',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Segundo apellido del paciente',
  })
  segundoApellido: string;

  @Column({
    name: 'nro_documento',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Numero de documento del paciente',
  })
  nroDocumento: string;

  @Column({
    name: 'genero',
    type: 'int',
    nullable: true,
    comment: 'Genero del paciente',
  })
  genero: string;

  @Column({
    name: 'fecha_naci',
    type: 'date',
    nullable: true,
    comment: 'Fecha de naciemiento del paciente',
  })
  fechaNaci: string;

  @Column({
    name: 'edad',
    type: 'int',
    nullable: true,
    comment: 'Nombre de la persona',
  })
  edad: string;

  @Column({
    name: 'ante _alergias',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Antecedentes de alergias',
  })
  anteAlergias?: string | '';

  // @Column({
  //   name: 'nroDocumento',
  //   length: 100,
  //   type: 'varchar',
  //   nullable: true,
  //   comment: 'Nombre de la persona',
  // })
  // anteCuadro: string;

  @Column({
    name: 'cual_cuadro',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Cuadro de antecedentes',
  })
  cualCuadro?: string | '';

  // esavais
  //para paciente mujer

  // @Column({
  //   name: 'nroDocumento',
  //   length: 100,
  //   type: 'varchar',
  //   nullable: true,
  //   comment: 'Nombre de la persona',
  // })
  // embarazo: string;

  @Column({
    name: 'fum',
    type: 'date',
    nullable: true,
    comment: 'fecha de la ultima mestruacion',
  })
  fum?: Date | null | '';

  // del esavi
  // criterio de gravedad
  // sintomas
  @Column({
    name: 'fecha_sintomas',
    type: 'timestamp',
    nullable: true,
    comment: 'Fecha de inicio de sintomas',
  })
  fechaSintomas: string;

  @Column({
    name: 'desenlace_esavi',
    type: 'int',
    nullable: true,
    comment: 'Desenlace de esavi',
  })
  desenlaceEsavi?: string | '';

  // datos del notificacor

  @Column({
    name: 'id_noti',
    type: 'int',
    nullable: true,
    comment: 'id de la persona de notificador',
  })
  idNoti?: string | '';

  @Column({
    name: 'profesion_noti',
    type: 'int',
    nullable: true,
    comment: 'profesion del notificador',
  })
  profesionNoti?: string | '';

  @Column({
    name: 'nombres_noti',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'nombres del notificador',
  })
  nombresNoti: string;

  @Column({
    name: 'primer_apellido_noti',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'primer apellido del notificador',
  })
  primerApellidoNoti: string;

  @Column({
    name: 'segundo_apellido_noti',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'segundo apellido del notificador',
  })
  segundoApellidoNoti?: string | '';

  @Column({
    name: 'telefono_noti',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'telefono del notificador',
  })
  telefonoNoti: string;

  @Column({
    name: 'fecha_naci_noti',
    type: 'date',
    comment: 'fecha del nacimeinto del notificador',
  })
  fechaNaciNoti: Date | '';

  @Column({
    name: 'nro_documento_noti',
    length: 100,
    type: 'varchar',
    nullable: true,
    comment: 'Nombre de la persona',
  })
  nroDocumentoNoti?: string | '';

  // clasificacion del esavi para departamental
  @Column({
    name: 'instancia_clasi',
    type: 'int',
    nullable: true,
    comment: 'Nombre de la persona',
  })
  instanciaClasi?: string | '';

  @Column({
    name: 'clasifi_final',
    type: 'int',
    nullable: true,
    comment: 'Nombre de la persona',
  })
  clasifiFinal?: string | '';

  @OneToMany(() => EsaviCriterios, (elem) => elem.esavi)
  @JoinColumn({ name: 'id', referencedColumnName: 'esavi_id' })
  esavicriterios: EsaviCriterios[];

  @OneToMany(() => EsaviSintomas, (elem) => elem.esavi)
  @JoinColumn({ name: 'id', referencedColumnName: 'esavi_id' })
  esavisintomas: EsaviSintomas[];

  @OneToMany(() => Antecedentes, (elem) => elem.esavi)
  @JoinColumn({ name: 'id', referencedColumnName: 'esavi_id' })
  antecendentes: Antecedentes[];

  constructor(data?: Partial<Esavi>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  // @BeforeInsert()
  // insertarEstado() {
  //   this.estado = this.estado || EsaviEstado.ACTIVO;
  // }
}
