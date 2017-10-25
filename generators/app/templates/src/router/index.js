import Vue from 'vue';
import Router from 'vue-router';
import Root from '@/components/dashboard/Root';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Root
    }
  ]
});
