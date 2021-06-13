import { Printer, FullRequest } from 'ipp';
import { Printer as Printable, PrintJob } from './abstract.printer';

export class LabelPrinter implements Printable {
  public async print(job: PrintJob): Promise<boolean> {
    let success = false;
    try {
      const printer = new Printer(job.url);
      const config: FullRequest = {
        'operation-attributes-tag': {
          'job-name': 'Label Print',
          'document-format': 'application/pdf',
        },
        data: job.data,
      };
      printer.execute('Print-Job', config, (err, response) => {
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
