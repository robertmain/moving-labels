import Vue from 'vue';
import { Mutation, MutationTree } from 'vuex';
import { State } from './state';
import { Box } from './types';

export enum MUTATIONS {
  ADD_BOXES = 'ADD_BOXES',
  UPDATE_BOX = 'UPDATE_BOX',
  SET_CURRENT_BOX_ID = 'SET_CURRENT_BOX_ID',
  AJAX_FAILIURE = 'AJAX_FAILIURE',
}

export const mutations: MutationTree<State> = {
  [MUTATIONS.ADD_BOXES](state, boxes: Box[]): void {
    state.boxes.push(...boxes);
  },
  [MUTATIONS.SET_CURRENT_BOX_ID](state, id: string) {
    state.currentBoxId = id;
  },
  [MUTATIONS.AJAX_FAILIURE](_, error) {
    console.error(error);
  },
  [MUTATIONS.UPDATE_BOX](state, { id, ...box }: Box) {
    const boxToUpdate = state.boxes.find(({ id: boxId }) => boxId === id);
    const boxIndex = state.boxes.indexOf(boxToUpdate);
    Vue.set(state.boxes, boxIndex, { id, ...box });
  },
};
