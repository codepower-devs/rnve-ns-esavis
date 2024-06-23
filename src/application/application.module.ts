import { Module } from '@nestjs/common';
import { ParametroModule } from './parametro/parametro.module';
import { EsavisModule } from './esavis/esavis.module';

@Module({
  imports: [ParametroModule, EsavisModule],
})
export class ApplicationModule {}
