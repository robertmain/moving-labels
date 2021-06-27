import { Action } from 'vuex';
import { getConfig } from '@/api/Config';
import { MUTATIONS } from './mutations';
import { State } from './state';

export enum ACTIONS {
  GET_APP_NAME = 'GET_APP_NAME',
}

export const actions: Record<string, Action<State, State>> = {
  async [ACTIONS.GET_APP_NAME]({ commit }): Promise <void> {
    const { data } = await getConfig('APP_NAME');
    commit(MUTATIONS.SET_APP_NAME, data.APP_NAME);
  },
};
