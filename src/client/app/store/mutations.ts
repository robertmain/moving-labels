import { Mutation } from 'vuex';
import { State } from './state';

export enum MUTATIONS {
  SET_APP_NAME = 'SET_APP_NAME',
}

export const mutations: Record<string, Mutation<State>> = {
  [MUTATIONS.SET_APP_NAME](state, appTitle: string): void {
    state.APP_NAME = appTitle;
  },
};
