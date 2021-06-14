import { Module } from '@nestjs/common';
import { IppPrinter } from './printers/ipp.printer';
import { PDFPrinter } from './printers/pdf.printer';

@Module({
  imports: [],
  controllers: [
  ],
  providers: [
    PDFPrinter,
    IppPrinter,
  ],
  exports: [
    PDFPrinter,
    IppPrinter,
  ],
})
export class PrinterModule {}
