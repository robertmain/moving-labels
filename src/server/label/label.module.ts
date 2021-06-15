import { Module } from '@nestjs/common';
import { BoxModule } from 'server/box/box.module';
import { PrinterModule } from 'server/printer/printer.module';
import { LabelController } from './label.controller';

@Module({
  imports: [
    BoxModule,
    PrinterModule.register({
      labelPrinterUrl: process.env.PRINTER_URL,
    }),
  ],
  controllers: [
    LabelController,
  ],
  providers: [],
  exports: [],
})
export class LabelModule { }
