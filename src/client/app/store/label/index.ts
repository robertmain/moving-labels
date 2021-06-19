import { Module } from 'vuex';
import { mutations } from './mutations';
import { LabelStateShape, state } from './state';
import { State } from '../state';
import { actions } from './actions';
import { getters } from './getters';

export const LabelModule: Module<LabelStateShape, State> = {
  state,
  mutations,
  actions,
  getters,
};
