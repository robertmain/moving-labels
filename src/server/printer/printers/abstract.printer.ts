export type PrintJob = {
  url: string,
  copies: number,
  data: Buffer,
};

export interface Printer {
  print(job: PrintJob): Promise<boolean>
}
