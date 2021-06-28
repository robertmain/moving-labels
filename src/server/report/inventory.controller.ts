import {
  Controller,
  Get,
  Header,
  Res,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import PDF from 'pdfmake';
import { Item } from 'server/box/item.entity';
import { Writable } from 'stream';
import { Repository } from 'typeorm';

@Controller('inventory')
export class InventoryController {
  @InjectRepository(Item)
  private itemRepository: Repository<Item>;

  private pdf: PDF;

  public constructor() {
    this.pdf = new PDF({
      Courier: {
        normal: 'Courier',
        bold: 'Courier-Bold',
        italics: 'Courier-Oblique',
        bolditalics: 'Courier-BoldOblique',
      },
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    });
  }

  @Get()
  @Header('Content-Type', 'application/pdf')
  public async fullManifest(@Res() res: Response): Promise<void> {
    const items = await this.itemRepository.find({
      order: {
        name: 'ASC',
      },
      relations: ['box'],
    });
    this.generateManifest(res, items);
  }

  private async generateManifest(
    stream: Writable,
    items: Item[] = []
  ): Promise<void> {
    const pdfDocument = this.pdf.createPdfKitDocument({
      pageSize: 'LETTER',
      pageMargins: [50, 90, 50, 72],
      defaultStyle: {
        font: 'Helvetica',
      },
      info: {
        title: 'Inventory',
        creationDate: new Date(),
      },
      header: {
        text: 'Inventory',
        margin: [72, 40],
        style: {
          alignment: 'center',
          fontSize: 20,
          bold: true,
        },
      },
      content: [
        {
          layout: 'lightHorizontalLines',
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              ['Item', 'Box'],
              ...items.map(({ name, box }) => ([
                { text: name, font: 'Courier', fontSize: 12 },
                { text: box.name, font: 'Courier', fontSize: 12 },
              ])),
            ],
          },
        },
      ],
    });
    pdfDocument.pipe(stream);
    pdfDocument.end();
  }
}
