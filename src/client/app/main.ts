import Vue from 'vue';
import App from './App.vue';
import router from './router';
import { store } from './store';

import 'reset.css';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/vars.scss';
import { ACTIONS } from './store/actions';

Vue.config.productionTip = false;

store.dispatch(ACTIONS.GET_APP_NAME, 'APP_NAME');
window.version = process.env.COMMIT_HASH.replace('\n', '');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
