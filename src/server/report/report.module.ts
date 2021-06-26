import { Module } from '@nestjs/common';
import { ManifestController } from './manifest.controller';
import { BoxModule } from '../box/box.module';

@Module({
  imports: [
    BoxModule,
  ],
  controllers: [
    ManifestController,
  ],
  providers: [
  ],
  exports: [
  ],
})
export class ReportModule {}
