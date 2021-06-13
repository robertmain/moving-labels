import { Module } from '@nestjs/common';
import { PDFPrinter } from './printers/pdf.printer';

@Module({
  imports: [],
  controllers: [
  ],
  providers: [
    PDFPrinter,
  ],
  exports: [
    PDFPrinter,
  ],
})
export class PrinterModule {}
