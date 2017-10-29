<template>
  <section class="page ">
    <HeaderCtrl></HeaderCtrl>
    <div class="page-bd" id="appContent">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import HeaderCtrl from './Header';

  export default {
    components: {HeaderCtrl}
  };
</script>
