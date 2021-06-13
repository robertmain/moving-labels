import { Module } from '@nestjs/common';
import { LabelPrinter } from './printers/label.printer';
import { PDFPrinter } from './printers/pdf.printer';

@Module({
  imports: [],
  controllers: [
  ],
  providers: [
    PDFPrinter,
    LabelPrinter,
  ],
  exports: [
    PDFPrinter,
    LabelPrinter,
  ],
})
export class PrinterModule {}
