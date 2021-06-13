import {
  Body,
  Controller,
  Get,
  Header,
  Inject,
  InternalServerErrorException,
  Post,
  Res,
} from '@nestjs/common';
import { Printer } from 'server/printer/printers/abstract.printer';
import { PDFPrinter } from 'server/printer/printers/pdf.printer';
import { Response } from 'express';
import PDFDocument, { widthOfString } from 'pdfkit';
import QrCode from 'qrcode';
import { EOL } from 'os';
import { BoxService } from '../box/box.service';
import { LabelService } from './label.service';

@Controller('label')
export class LabelController {
  @Inject(PDFPrinter)
  public printer: Printer;

  @Inject(BoxService)
  public boxService: BoxService;

  @Inject(LabelService)
  public labelService: LabelService;

  @Get('/')
  @Header('Content-Type', 'application/pdf')
  public async example(
    @Res() res: Response
  ): Promise<void> {
    const [box] = await this.boxService.findAll();

    const qrCode = await QrCode.toDataURL(box.id);

    const DOCUMENT = {
      WIDTH: 81,
      HEIGHT: 252,
    };

    const QR_CODE_SIZE = 80;
    const MARGIN = 10;

    const document = new PDFDocument({
      size: [DOCUMENT.WIDTH, DOCUMENT.HEIGHT],
      margin: MARGIN,
    })
      .fontSize(14)
      .rotate(90, { origin: [20, 20] })
      .rotate(180 * -1, { origin: [20, 20] })
      .text(box.name, -((DOCUMENT.HEIGHT - QR_CODE_SIZE) - MARGIN * 4), MARGIN)
      .fontSize(9)
      .font('Courier')
      .image(
        qrCode,
        -(DOCUMENT.HEIGHT - MARGIN * 4),
        0,
        { width: QR_CODE_SIZE, height: QR_CODE_SIZE }
      )
      .text([
        'First Name, Last Name',
        'Address Line 1',
        'Address Line 2',
        'ZIP Code',
      ].join(EOL),
      -((DOCUMENT.HEIGHT - QR_CODE_SIZE) - MARGIN * 4),
      MARGIN * 3);

    document.pipe(res);
    document.end();
  }

  @Post()
  public async print(@Body('id') boxId: string): Promise<boolean> {
    try {
      return this.printer.print({
        copies: 1,
        data: new Uint8Array(),
      });
    } catch (e) {
      throw new InternalServerErrorException(`Printing failed ${JSON.stringify(e)}`);
    }
  }
}
