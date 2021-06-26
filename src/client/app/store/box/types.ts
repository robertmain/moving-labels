export enum SIZE {
  XLARGE = 'XLARGE',
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
  XSMALL = 'XSMALL',
}

type Describable = {
  id?: string;
  name: string;
  description?: string;
}

export type Item = Describable & {
  value: number;
}

export type Box = Describable & {
  contents: Item[];
  size: SIZE,
}
