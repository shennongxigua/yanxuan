<template>
  <div class="tabBar" v-if="data">
    <div v-for="(item,index) in data" :key="index" :class="['item', (item.index == activeIndex) && 'active']" :data-path='item.path' :data-index='item.index' @click='switchTab'>
      <i :class="item.iconname"></i>
      <span>{{item.title}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listData", "defaultActive"],
  data() {
    return {
      data: [],
      activeIndex: "",
    };
  },
  methods: {
    switchTab(event) {
      if (event.currentTarget.dataset.index != this.activeIndex) {
        this.activeIndex = event.currentTarget.dataset.index;
        // 跳转路由
        this.$router.push(event.currentTarget.dataset.path);
      }
    },
  },
  watch: {
    listData() {
      this.data = this.listData;
    },
    defaultActive() {
      this.activeIndex = this.defaultActive;
    },
    activeIndex() {
      this.$emit("select", this.activeIndex);
    },
  },
  created() {
    this.data = this.listData;
    this.activeIndex = this.defaultActive;
  },
};
</script>

<style lang="less" scoped>
.tabBar {
  box-sizing: border-box;
  position: fixed;
  display: flex;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 98px;
  border-top: 1px solid #eeeeee;
  background-color: #ffffff;

  .item {
    display: flex;
    flex: 1;
    // width: 20%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #666666;

    .iconfont {
      font-size: 40px;
    }

    span {
      font-size: 24px;
    }
  }

  .active {
    color: #dd1a21;
  }
}
</style>