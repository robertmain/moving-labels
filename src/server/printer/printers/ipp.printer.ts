import { Printer, FullRequest } from 'ipp';
import { Printer as Printable, PrintJob } from './abstract.printer';

export class IppPrinter implements Printable {
  private printer: Printer;

  public constructor(url: string) {
    this.printer = new Printer(url);
  }

  public async print({ data, name = 'Label Print' }: PrintJob): Promise<boolean> {
    let success = false;
    try {
      const config: FullRequest = {
        'operation-attributes-tag': {
          'job-name': name,
          'document-format': 'application/pdf',
        },
        data,
      };
      this.printer.execute('Print-Job', config, (err, response) => {
        if (err) {
          console.log(err);
        }
        console.log(response);
      });
      success = true;
    } catch (e) {
      console.log(e);
      success = false;
    }
    return success;
  }
}
