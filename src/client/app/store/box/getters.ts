import { Getter } from 'vuex';
import { State } from '../state';
import { BoxStateShape } from './state';

export const getters: Record<string, Getter<State, BoxStateShape>> = {
  boxes: (state) => state.boxes,
};
