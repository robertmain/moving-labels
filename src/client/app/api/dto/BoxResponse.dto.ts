export type ItemResponse = {
  id?: string;
  name: string;
  description?: string;
  value: number;
}

export type BoxResponse = {
  id?: string;
  name: string;
  description?: string;
  contents: ItemResponse[];
}
