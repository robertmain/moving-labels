import { EOL } from 'os';
import PDFDocument from 'pdfkit';
import QrCode from 'qrcode';

export type LabelConfig = {
  width: number,
  height: number,
  barcode: {
    data?: string,
    size: number,
  },
  text?: string,
  address?: string[],
  margin: number,
};

export class Label {
  private config: LabelConfig;

  private document: PDFKit.PDFDocument;

  public constructor(config: LabelConfig) {
    this.config = config;

    this.document = new PDFDocument({
      size: [config.width, config.height],
      margin: this.config.margin,
      info: {
        Title: this.config.text,
      },
    });
  }

  public async render(): Promise<Buffer> {
    const qrCode = await QrCode.toDataURL(this.config.barcode.data);
    this.document
      .fontSize(14)
      .rotate(90, { origin: [20, 20] })
      .rotate(180 * -1, { origin: [20, 20] })
      .text(
        this.config.text,
        -(
          (this.config.height - this.config.barcode.size)
          - this.config.margin * 4),
        this.config.margin
      )
      .fontSize(9)
      .font('Courier')
      .image(
        qrCode,
        -(this.config.height - this.config.margin * 4),
        0,
        {
          width: this.config.barcode.size,
          height: this.config.barcode.size,
        }
      )
      .text([
        'R+T Main',
        '53 America Boulevard',
        'Ashland, MA',
        '02717',
      ].join(EOL),
      -(
        (this.config.height - this.config.barcode.size) - this.config.margin * 4
      ), this.config.margin * 3);
    this.document.end();
    return new Promise((resolve, reject) => {
      const chunks = [];
      this.document.on('data', (chunk) => chunks.push(chunk));
      this.document.on('end', () => resolve(Buffer.concat(chunks)));
      this.document.on('error', reject);
    });
  }
}
