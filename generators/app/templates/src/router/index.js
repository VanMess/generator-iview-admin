import Vue from 'vue';
import Router from 'vue-router';

import Root from '@/components/dashboard/Root';
import HelloPage from '@/components/Hello';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      component: Root,
      children: [
        {path: '', component: HelloPage, name: 'index', meta: {keepAlive: true}}
      ]
    }
  ]
});
