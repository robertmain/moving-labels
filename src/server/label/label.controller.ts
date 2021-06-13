import {
  Controller,
  Get,
  Header,
  Inject,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { PDFPrinter } from 'server/printer/printers/pdf.printer';
import { Response } from 'express';
import { BoxService } from '../box/box.service';
import { Label } from './label';

@Controller('label')
export class LabelController {
  @Inject(PDFPrinter)
  public printer: PDFPrinter;

  @Inject(BoxService)
  public boxService: BoxService;

  @Get(':id')
  @Header('Content-Type', 'application/pdf')
  public async print(
    @Param('id') id: string,
      @Res() res: Response
  ): Promise<void> {
    const [box] = await this.boxService.findById([id]);
    if (!box) {
      throw new NotFoundException(`Unable to find box: ${id}`);
    }
    const label = new Label({
      width: 81,
      height: 252,
      barcode: {
        size: 80,
        data: box.id,
      },
      margin: 10,
      text: box.name,
    });
    const labelData = await label.render();
    res.write(labelData);
    res.end();
  }
}
