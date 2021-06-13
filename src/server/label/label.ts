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
    const { barcode, height, margin } = this.config;
    const qrCode = await QrCode.toDataURL(barcode.data);
    this.document
      .fontSize(14)
      .rotate(90, { origin: [20, 20] })
      .rotate(180 * -1, { origin: [20, 20] })
      .text(
        this.config.text,
        -(
          (height - barcode.size)
          - margin * 4),
        margin
      )
      .fontSize(9)
      .font('Courier')
      .image(
        qrCode,
        -(height - margin * 4),
        0,
        {
          width: barcode.size,
          height: barcode.size,
        }
      )
      .text(this.config.address.join(EOL),
        -((height - barcode.size) - margin * 4), margin * 3);
    this.document.end();
    return new Promise((resolve, reject) => {
      const chunks = [];
      this.document.on('data', (chunk) => chunks.push(chunk));
      this.document.on('end', () => resolve(Buffer.concat(chunks)));
      this.document.on('error', reject);
    });
  }
}
