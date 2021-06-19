import { Mutation } from 'vuex';
import { BoxStateShape } from './state';
import { Box } from './types';

export enum MUTATIONS {
  ADD_BOXES = 'ADD_BOXES',
  SET_CURRENT_BOX_ID = 'SET_CURRENT_BOX_ID',
  AJAX_FAILIURE = 'AJAX_FAILIURE',
}

export const mutations: Record<string, Mutation<BoxStateShape>> = {
  [MUTATIONS.ADD_BOXES](state, boxes: Box[]): void {
    state.boxes.push(...boxes);
  },
  [MUTATIONS.SET_CURRENT_BOX_ID](state, id: string) {
    state.currentBoxId = id;
  },
  [MUTATIONS.AJAX_FAILIURE](_, error) {
    console.error(error);
  },
};
