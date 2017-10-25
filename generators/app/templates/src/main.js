{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue';
import 'classlist-polyfill';
import iView from 'iview';
import vueMeta from 'vue-meta';

import App from './App';
import router from './router';

Vue.config.productionTip = process.env.NODE_ENV === 'production';
Vue.config.performance = Vue.config.devtools = process.env.NODE_ENV === 'development';

Vue.use(iView);
Vue.use(vueMeta);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  template: '<App/>',
  components: { App }
  {{/if_eq}}
});
