import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';
import './components';

import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n';

Vue.config.productionTip = false;

Vue.filter('numeric', (value) => new Intl.NumberFormat('en-En').format(value));

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
