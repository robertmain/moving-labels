import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';

import 'reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/vars.scss';
import { MUTATIONS } from './store/mutations';

Vue.config.productionTip = false;

store.commit(MUTATIONS.SET_APP_NAME, process.env.APP_NAME);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
