import { DynamicModule, Module } from '@nestjs/common';
import { IppPrinter } from './printers/ipp.printer';
import { PDFPrinter } from './printers/pdf.printer';

export enum PRINTER_TYPE {
  LABEL = 'LABEL',
}

export type PrinterConfiguration = {
  labelPrinterUrl: string;
}

@Module({})
export class PrinterModule {
  public static register(config: PrinterConfiguration): DynamicModule {
    return {
      module: PrinterModule,
      providers: [
        PDFPrinter,
        {
          provide: PRINTER_TYPE.LABEL,
          useFactory: () => new IppPrinter(config.labelPrinterUrl),
        },
      ],
      exports: [
        PDFPrinter,
        {
          provide: PRINTER_TYPE.LABEL,
          useFactory: () => new IppPrinter(config.labelPrinterUrl),
        },
      ],
    };
  }
}
