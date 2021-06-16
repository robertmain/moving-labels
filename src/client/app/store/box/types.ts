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
}
