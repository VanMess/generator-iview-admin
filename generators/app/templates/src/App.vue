<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>


<script>
  export default {
    metaInfo() {
      const {$route: {meta}} = this;
      const title = meta.title || '';

      return {
        title,
        titleTemplate: 'ProductAI - %s'
      };
    }
  };
</script>
