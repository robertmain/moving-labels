import { Module } from '@nestjs/common';
import { BoxModule } from 'server/box/box.module';
import { PrinterModule } from 'server/printer/printer.module';
import { LabelController } from './label.controller';
import { LabelService } from './label.service';

@Module({
  imports: [
    BoxModule,
    PrinterModule,
  ],
  controllers: [
    LabelController,
  ],
  providers: [
    LabelService,
  ],
  exports: [
    LabelService,
  ],
})
export class LabelModule { }
