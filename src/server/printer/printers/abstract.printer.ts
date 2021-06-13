export type PrintJob = {
  copies: number,
  data: Buffer,
};

export interface Printer {
  print(job: PrintJob): Promise<boolean>
}
