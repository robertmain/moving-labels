import {
  Body,
  Controller,
  Header,
  Inject,
  NotFoundException,
  Post,
  Res,
} from '@nestjs/common';
import { IppPrinter } from 'server/printer/printers/ipp.printer';
import { Response } from 'express';
import { PRINTER_TYPE } from 'server/printer/printer.module';
import { BoxService } from '../box/box.service';
import { Label } from './label';

@Controller('label')
export class LabelController {
  @Inject(PRINTER_TYPE.LABEL)
  public printer: IppPrinter;

  @Inject(BoxService)
  public boxService: BoxService;

  @Post()
  @Header('Content-Type', 'application/pdf')
  public async print(
    @Body('id') id: string,
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
      address: process.env.ADDRESS.split('|'),
    });
    const labelData = await label.render();
    await this.printer.print({
      data: labelData,
      name: `${box.name} label`,
    });
    res.write(labelData);
    res.end();
  }
}
