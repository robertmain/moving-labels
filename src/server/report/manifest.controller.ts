import {
  Controller,
  Get,
  Header,
  Inject,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import PDF from 'pdfmake';
import { Writable } from 'stream';
import { Box } from '../box/box.entity';
import { BoxService } from '../box/box.service';

@Controller('manifest')
export class ManifestController {
  @Inject(BoxService)
  private boxService: BoxService;

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
    const boxes = await this.boxService.findAll(false, {
      relations: ['contents'],
    });
    this.generateManifest(res, boxes);
  }

  @Get(':id')
  @Header('Content-Type', 'application/pdf')
  public async boxManifest(
    @Param('id') id: string,
      @Res() res: Response
  ): Promise<void> {
    const [box] = await this.boxService.findById([id], false, {
      relations: ['contents'],
    });

    this.generateManifest(res, [box], box.name);
  }

  private async generateManifest(
    stream: Writable,
    boxes: Box[] = [],
    title?: string
  ): Promise<void> {
    const pdfDocument = this.pdf.createPdfKitDocument({
      pageSize: 'LETTER',
      pageMargins: [50, 90, 50, 72],
      defaultStyle: {
        font: 'Helvetica',
      },
      info: {
        title: title || `${process.env.APP_NAME} Packing Manifest`,
        creationDate: new Date(),
      },
      header: {
        text: title || `${process.env.APP_NAME} Packing Manifest`,
        margin: [72, 40],
        style: {
          alignment: 'center',
          fontSize: 20,
          bold: true,
        },
      },
      content: [
        ...boxes.map(({ name: boxName, contents }) => ([
          !title ? { text: boxName, bold: true } : null,
          {
            layout: 'lightHorizontalLines',
            table: {
              headerRows: 1,
              widths: ['*', 'auto'],
              body: [
                [
                  { bold: true, text: 'Item' },
                  { bold: true, text: 'Value' },
                ],
                ...contents.map(({ name, value }) => ([
                  { text: name, font: 'Courier', fontSize: 12 },
                  {
                    font: 'Courier',
                    fontSize: 12,
                    alignment: 'right',
                    text: (value) ? value.toLocaleString('en-US', {
                      currency: 'USD',
                      style: 'currency',
                    }) : '',
                  },
                ])),
                [
                  { text: 'Total Box Value', bold: true, alignment: 'right' },
                  {
                    font: 'Courier',
                    text: contents.reduce((acc, { value: val }) => acc + val, 0)
                      .toLocaleString('en-US', {
                        currency: 'USD',
                        style: 'currency',
                      }),
                  },
                ],
              ],
            },
          },
        ]
        )),
        { text: ' ' },
        {
          table: {
            widths: ['auto', 'auto'],
            body: [
              [
                {
                  text: '# of Boxes',
                  bold: true,
                },
                {
                  text: boxes.length.toString(),
                  alignment: 'center',
                },
              ],
              [
                {
                  text: '# of Items',
                  bold: true,
                },
                {
                  text: boxes.map(({ contents }) => contents)
                    .reduce((acc, val) => acc.concat(val), [])
                    .length.toString(),
                  alignment: 'center',
                },
              ],
              [
                {
                  text: 'Total Value',
                  bold: true,
                },
                {
                  text: boxes.map(({ contents }) => contents)
                    .reduce((acc, val) => acc.concat(val), [])
                    .reduce((acc, { value }) => acc + value, 0)
                    .toLocaleString('en-US', {
                      currency: 'USD',
                      style: 'currency',
                    }),
                },
              ],
            ],
          },
        },
      ],
    });
    pdfDocument.pipe(stream);
    pdfDocument.end();
  }
}
