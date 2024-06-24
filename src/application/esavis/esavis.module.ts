import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EsavisController } from './controller/esavis.controller'
import { Esavi } from './entity/esavi.entity'
import { EsavisRepository } from './repository'
import { EsavisService } from './service'
import { GlobalesController } from './controller'
import { GlobalesService } from './service/globales.service'
import { GlobalesRepository } from './repository/globales.repository'

@Module({
  controllers: [EsavisController,GlobalesController],
  providers: [EsavisService, EsavisRepository, GlobalesService, GlobalesRepository],
  imports: [TypeOrmModule.forFeature([Esavi])]
})
export class EsavisModule {}
