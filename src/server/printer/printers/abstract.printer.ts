export type PrintJob = {
  name?: string,
  copies: number,
  data: Buffer,
};

export interface Printer {
  print(job: PrintJob): Promise<boolean>
}
