import Vue from 'vue';
import Vuex from 'vuex';
import { BoxModule } from './box/index';
import { LabelModule } from './label/index';
import { state } from './state';
import { mutations } from './mutations';

Vue.use(Vuex);
export const store = new Vuex.Store({
  state,
  mutations,
  getters: {
    appName: ({ APP_NAME }) => APP_NAME,
  },
  modules: {
    BoxModule,
    LabelModule,
  },
});
