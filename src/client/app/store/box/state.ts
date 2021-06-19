import { Box } from './types';

export type BoxStateShape = {
  currentBoxId: string | null;
  boxes: Box[];
}

export const state : BoxStateShape = {
  currentBoxId: null,
  boxes: [],
};
