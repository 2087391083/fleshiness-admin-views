<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
  *{
    margin:0;
    padding:0;
  }
  #c{
    position: fixed;
    z-index:-1;
  }
</style>
