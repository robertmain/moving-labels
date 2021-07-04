import { MutationTree } from 'vuex';
import { State } from './state';

export enum MUTATIONS {
  PRINTING_STARTED = 'PRINTING_STARTED',
  PRINTING_COMPLETE = 'PRINTING_COMPLETE',
  PRINTER_ERROR = 'PRINTER_ERROR',
}

export const mutations: MutationTree<State> = {
  [MUTATIONS.PRINTING_STARTED](state): void {
    state.printing = true;
  },
  [MUTATIONS.PRINTING_COMPLETE](state): void {
    state.printing = false;
  },
  [MUTATIONS.PRINTER_ERROR](state, error: Error): void {
    console.error(error);
  },
};
