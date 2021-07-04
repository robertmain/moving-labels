import { MutationTree } from 'vuex';
import { RootState } from './state';

export enum MUTATIONS {
  SET_APP_NAME = 'SET_APP_NAME',
}

export const mutations: MutationTree<RootState> = {
  [MUTATIONS.SET_APP_NAME](state, appTitle: string): void {
    state.APP_NAME = appTitle;
  },
};
