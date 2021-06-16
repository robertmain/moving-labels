import { Action } from 'vuex';
import { addBox, getBoxes } from '@/api/Box';
import { BoxStateShape } from './state';
import { MUTATIONS } from './mutations';
import { State } from '../state';
import { Box } from './types';

export enum ACTIONS {
  GET_BOXES = 'GET_BOXES',
  ADD_BOX = 'ADD_BOX',
}

export const actions: Record<string, Action<BoxStateShape, State>> = {
  async [ACTIONS.GET_BOXES]({ commit }): Promise <void> {
    try {
      const { data } = await getBoxes();
      commit(MUTATIONS.ADD_BOXES, data);
    } catch (error) {
      commit(MUTATIONS.AJAX_FAILIURE, error);
    }
  },
  async [ACTIONS.ADD_BOX]({ commit }, box: Box): Promise <void> {
    try {
      const { data } = await addBox(box);
      commit(MUTATIONS.ADD_BOXES, data);
    } catch (error) {
      commit(MUTATIONS.AJAX_FAILIURE, error);
    }
  },
};
