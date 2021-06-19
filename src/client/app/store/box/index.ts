import { Module } from 'vuex';
import { mutations } from './mutations';
import { BoxStateShape, state } from './state';
import { State } from '../state';
import { actions } from './actions';
import { getters } from './getters';

export const BoxModule: Module<BoxStateShape, State> = {
  state,
  mutations,
  actions,
  getters,
};
