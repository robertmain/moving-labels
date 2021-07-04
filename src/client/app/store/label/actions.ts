import { ActionTree } from 'vuex';
import { printLabel } from '@/api/Label';
import { State } from './state';
import { MUTATIONS } from './mutations';
import { RootState } from '../state';

export enum ACTIONS {
  PRINT_LABEL = 'PRINT_LABEL',
}

export const actions: ActionTree<State, RootState> = {
  async [ACTIONS.PRINT_LABEL]({ commit }, id: string): Promise <void> {
    commit(MUTATIONS.PRINTING_STARTED);
    try {
      await printLabel(id);
    } catch (error) {
      commit(MUTATIONS.PRINTER_ERROR, error);
    } finally {
      commit(MUTATIONS.PRINTING_COMPLETE);
    }
  },
};
