import { writeFile as wf } from 'fs';
import { promisify } from 'util';
import { Printer, PrintJob } from './abstract.printer';

const writeFile = promisify(wf);

export class PDFPrinter implements Printer {
  public async print(job: PrintJob): Promise<boolean> {
    let success = false;
    try {
      const copies = Array(job.copies).fill('')
        .map((copy) => writeFile(
          (job.copies > 1 ? `${job.url}(${copy})` : job.url),
          job.data
        ));
      Promise.all(copies);
      success = true;
    } catch (e) {
      success = false;
    }
    return success;
  }
}
