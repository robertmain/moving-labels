import Vue from 'vue';
import Vuex from 'vuex';
import { BoxModule } from './box/index';
import { LabelModule } from './label/index';

Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    BoxModule,
    LabelModule,
  },
});
