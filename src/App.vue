<template>
  <div id="app">
    <!-- 在 head 标签中添加 meta 标签，并设置 viewport-fit=cover 值 -->
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover"
    />

    <!-- 开启顶部安全区适配 -->
    <!-- <van-nav-bar safe-area-inset-top /> -->

    <!-- 开启底部安全区适配 -->
    <!-- <van-number-keyboard safe-area-inset-bottom /> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
  background-color: #f7f8fa;
  height: 100vh;
}
</style>
