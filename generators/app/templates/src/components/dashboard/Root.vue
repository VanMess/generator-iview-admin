<template>
  <section class="page ">
    <HeaderCtrl></HeaderCtrl>
    <NavCtrl></NavCtrl>
    <div class="page-bd " id="appContent">
      <div class="page-content">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
  import HeaderCtrl from './Header';
  import NavCtrl from './Nav';

  export default {
    components: {HeaderCtrl, NavCtrl}
  };
</script>
