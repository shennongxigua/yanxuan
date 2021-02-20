<template>
  <div id="app">
    <!-- App 根组件 -->
    <!-- 路由占位符 -->
    <router-view ></router-view>
    <tab-bar v-if="showTabBar" :list-data='tabBarData' :default-active='index' @select='selectHandle'></tab-bar>

  </div>
</template>

<script>
import TabBar from './components/TabBar/TabBar.vue'
export default {
  name: "app",
  data() {
    return {
      showTabBar: false,
      index: 1,
      tabBarData: [
        { index: 1, title: '首页', path: '/Home', iconname: 'iconfont icon-tubiao115',},
        { index: 2, title: '分类', path: '/CateList', iconname: 'iconfont icon-fenleimokuai',},
        { index: 3, title: '值得买', path: '/BargainBuy', iconname: 'iconfont icon-xiangce',},
        { index: 4, title: '购物车', path: '/Cart', iconname: 'iconfont icon-buoumaotubiao40',},
        { index: 5, title: '个人', path: '/Person', iconname: 'iconfont icon-gerenzhongxin-jibenxinxi',},
      ]
    };
  },
  methods: {
    // 判断改页面是否需要显示tabBar 
    initShowTabBar(){      
      let flag = false;
      let path = location.hash.slice(1).toLowerCase();
      for (let index = 0; index < this.tabBarData.length; index++) {
        if(this.tabBarData[index].path.toLowerCase() == path){
          flag = true;
          break;
        }
      }
      this.showTabBar = flag;
    },
    // 选修切换的回调
    selectHandle(index) {
      this.index = index;
      this.setSess();
    },
    // 保存barTab的选中状态
    setSess() {
      sessionStorage.setItem('bt_active',this.index);
    },
    // 获取barTab的选中状态
    getSess() {
      let index = sessionStorage.getItem('bt_active');
      if (index) {
        this.index = index;
      }
    }
  },
  watch:{
    '$route.path': function(){
      this.initShowTabBar();
    }
  },
  components:{
    TabBar
  },
  created(){
    this.getSess();
    this.initShowTabBar();
  }
};
</script>

<style lang="less">
#app {
  height: 100%;
  overflow: scroll;
  background-color: #eeeeee;
}
</style>