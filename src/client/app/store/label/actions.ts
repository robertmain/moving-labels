import { Action } from 'vuex';
import { printLabel } from '@/api/Label';
import { LabelStateShape } from './state';
import { MUTATIONS } from './mutations';
import { State } from '../state';

export enum ACTIONS {
  PRINT_LABEL = 'PRINT_LABEL',
}

export const actions: Record<string, Action<LabelStateShape, State>> = {
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
