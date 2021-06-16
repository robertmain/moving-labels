import { Action } from 'vuex';
import { getBoxes } from '@/api/Box';
import { BoxStateShape } from './state';
import { MUTATIONS } from './mutations';
import { State } from '../state';

export enum ACTIONS {
  GET_BOXES = 'GET_BOXES',
}

export const actions: Record<string, Action<BoxStateShape, State>> = {
  async [ACTIONS.GET_BOXES]({ commit }): Promise <void> {
    try {
      const { data } = await getBoxes();
      commit(MUTATIONS.GET_BOXES_SUCCESS, data);
    } catch (error) {
      commit(MUTATIONS.GET_BOXES_FAILURE, error);
    }
  },
};
