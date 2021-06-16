import { Mutation } from 'vuex';
import { BoxStateShape } from './state';
import { Box } from './types';

export enum MUTATIONS {
  GET_BOXES_SUCCESS = 'GET_BOXES_SUCCESS',
  GET_BOXES_FAILURE = 'GET_BOXES_FAILURE',
}

export const mutations: Record<string, Mutation<BoxStateShape>> = {
  [MUTATIONS.GET_BOXES_SUCCESS](state, boxes: Box[]): void {
    state.boxes.push(...boxes);
  },
  [MUTATIONS.GET_BOXES_FAILURE](_, error): void {
    console.error(error);
  },
};
