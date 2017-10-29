<template>
  <div class="hello">
    <h1># Welcome to <%= name %></h1>
    <p><%= description %></p>
  </div>
</template>

<script>
export default {
  name: 'hello',
  metaInfo() {
    return {
      title: 'Hello world'
    };
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    };
  }
};
</script>
