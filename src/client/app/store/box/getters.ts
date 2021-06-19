import { Getter } from 'vuex';
import { State } from '../state';
import { BoxStateShape } from './state';

export const getters: Record<string, Getter<State, BoxStateShape>> = {
  boxes: ({ boxes }: BoxStateShape) => boxes,
  currentBox: ({ boxes, currentBoxId }: BoxStateShape) => boxes
    .find(({ id }) => id === currentBoxId) ?? ({
    id: null,
    name: '',
    description: '',
  }),
};
