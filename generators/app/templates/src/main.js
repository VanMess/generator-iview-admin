<% if(vueFile==='standalone'){ %>
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
<% } %>

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
  <% if(vueFile==='runtime'){ %>
  render: h => h(App)
  <% } else if(vueFile==='standalone'){ %>
  template: '<App/>',
  components: { App }
  <% } %>
});
