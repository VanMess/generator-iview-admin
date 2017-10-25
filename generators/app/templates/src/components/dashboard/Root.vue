<template>
  <section class="page ">
    <HeaderCtrl></HeaderCtrl>
    <div class="page-bd">
      <div class="page-content-wrapper" id="appContent">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import _ from 'lodash';
  import '@/css/frame.less';

  import HeaderCtrl from './Header';

  export default {
    components: {HeaderCtrl},
    computed: {
      hasSubmenu() {
        const {$route: {matched}} = this;
        for (let i = 0; i < matched.length; i++) {
          const {components} = matched[matched.length - 1];
          if (!_.isNil(components) && components.hasOwnProperty('submenu')) {
            return true;
          }
        }

        return false;
      }
    }
  };
</script>
