import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EsavisController } from './controller/esavis.controller'
import { Esavi } from './entity/esavi.entity'
import { EsavisRepository } from './repository'
import { EsavisService } from './service'

@Module({
  controllers: [EsavisController],
  providers: [EsavisService, EsavisRepository],
  imports: [TypeOrmModule.forFeature([Esavi])]
})
export class EsavisModule {}
