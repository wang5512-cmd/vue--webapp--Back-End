<template>
  <div id="app">
    <router-view class="content" />

    <!-- route 表示底部导航可以实现跳转功能 -->
    <van-tabbar :fixed="false" route v-model="active" active-color="deeppink">
      <van-tabbar-item :to="{ name: 'Home' }" icon="home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item :to="{ name: 'Hot' }" icon="fire">热卖</van-tabbar-item>
      <van-tabbar-item :to="{ name: 'Cart' }" icon="shopping-cart"
        >购物车</van-tabbar-item
      >
      <van-tabbar-item :to="{ name: 'User' }" icon="friends-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  overflow-y: auto;
}
</style>
