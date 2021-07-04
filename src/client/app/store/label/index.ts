import { Module } from 'vuex';
import { mutations } from './mutations';
import { State } from './state';
import { RootState } from '../state';
import { actions } from './actions';
import { getters } from './getters';

export const LabelModule: Module<State, RootState> = {
  state: new State(),
  mutations,
  actions,
  getters,
};
