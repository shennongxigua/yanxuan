<template>
  <!-- 头部 -->
  <div class="hdWraper">
    <router-link to="/home" class="toHome-icon iconfont icon-home-line"></router-link>
    <div class="toHome-logn">
      <router-link to="/home">网易严选</router-link>
    </div>
    <div class="right">
      <router-link to="/search" class="iconfont icon-sousuo"></router-link>
      <router-link to="/cart" class="iconfont icon-buoumaotubiao40"></router-link>
    </div>
  </div>

</template>

<script>
export default {};
</script>

<style lang="less">
.hdWraper {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  box-sizing: border-box;
  padding: 0 20px;
  white-space: nowrap;
  width: 750px;
  height: 88px;
  line-height: 88px;
  font-size: 44px;
  background-color: #fafafa;
  border-bottom: 1px solid #eaeaea;
  z-index: 1000;

  .toHome-icon {
    width: 100px;
    font-size: 64px;
    color: #555e5a;
  }

  .toHome-logn {
    flex-grow: 1;
    text-align: center;
    font-size: 44px;
    color: #636265;
    font-family: "kaiTi";
  }

  .right {
    width: 150px;

    .iconfont {
      margin-left: 20px;
      font-size: 54px;
      color: #555e5a;
    }
  }
}
</style>