import {
  Controller,
  Get,
  Header,
  Inject,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { Printer } from 'server/printer/printers/abstract.printer';
import { PDFPrinter } from 'server/printer/printers/pdf.printer';
import { Response } from 'express';
import { BoxService } from '../box/box.service';
import { Label } from './label';

@Controller('label')
export class LabelController {
  @Inject(PDFPrinter)
  public printer: Printer;

  @Inject(BoxService)
  public boxService: BoxService;

  @Get(':id')
  @Header('Content-Type', 'application/pdf')
  public async example(
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
    res.write(await label.render());
    res.end();
  }
}
