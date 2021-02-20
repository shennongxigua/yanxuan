<template>
  <div>
    <!-- 头部 -->
    <div class="hdWrapper">
      <div class="line">
        <!-- logo -->
        <div class="logo">网易严选</div>
        <div class="topSearchInput" @click="goSearchPath">
          <i class="iconfont icon-sousuo"></i>
          <span>搜索商品, 共50487款好物</span>
        </div>
        <div class="loginBtn" v-if="!token">登录</div>
      </div>

      <div class="list" v-if="indexData.kingKongModule ">
        <div class="listContent" v-if="!topNavToggleActive">
          <el-menu :default-active="activeKingKongUrl" class="el-menu-demo" mode="horizontal" @select="topNavHandleSelect">
            <el-menu-item :index="item.schemeUrl" v-for="item in indexData.kingKongModule.kingKongList.slice(0,9)" :key="item.text">{{ item.text == "新品首发" ? "推荐" : item.text }}</el-menu-item>
            <el-menu-item id="lastitem">------</el-menu-item>
          </el-menu>
        </div>
        <div class="moreContent" v-else-if="topNavToggleActive">
          <div class="title">全部频道</div>
          <el-menu :default-active="activeKingKongUrl" class="el-menu-demo" mode="horizontal" @select="topNavHandleSelect">
            <el-menu-item :index="item.schemeUrl" v-for="item in indexData.kingKongModule.kingKongList.slice(0,9)" :key="item.text">{{ item.text == "新品首发" ? "推荐" : item.text }}</el-menu-item>
          </el-menu>
        </div>
        <div :class="['toggle', topNavToggleActive && 'toggleActive']">
          <i class="iconfont icon-arrow-right" @click="toggleTopNav"></i>
        </div>
      </div>
      <div class="mask" v-show="topNavToggleActive" @click="hiddenMask"></div>
    </div>

    <div v-if="ActiveCategoryId === 11 && indexData">
      <!-- IndexComponent -->
      <index-component class="indexContent" :data="indexData"></index-component>
    </div>
    <div v-else-if="ActiveCategoryId !== 11">
      <!-- CateListInfo -->
      <cate-list-info class="cateListContent" :category-data='categoryData'></cate-list-info>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import IndexComponent from "./IndexComponent.vue";
import CateListInfo from "../CateList/CateListInfo.vue";
import Urlsub from '../../utils/UrlParamHash.js'
export default {
  data() {
    return {
      /* 
      bigPromotionModule 大促销模块
      categoryHotSellModule 类目热销榜  
      flashSaleModule 限时购
      focusList 焦点图  
      kingKongModule 频道模块
      newItemList 新品首发
      policyDescList 平台担保
      sceneLightShoppingGuideModule 底部模块    
      indexActivityModule 新人专享
       */
      indexData: {},
      categoryData: {},
      activeKingKongUrl: "", // 用于头部导航模块的URL
      topNavToggleActive: false, // 头部导航栏是否展开
      ActiveCategoryId: 11, // 默认11 为主页显示
      token: localStorage.getItem("xg_token"),
    };
  },
  methods: {
    async getIndexData() {
      ///xhr/index.json?__timestamp=1611200579667&
      let result = await axios(
        `/api/xhr/index.json?__timestamp=${+new Date()}`
      );
      this.indexData = result.data.data.data;

      // 初始化头部导航选中的url
      this.activeKingKongUrl =
        result.data.data.data.kingKongModule.kingKongList[0].schemeUrl;
    },
    // 获取分类商品列表数据
    async getCategoryData(categoryId) {
      /* 
      请求本地数据
      let result = await axios('/api/item/list.json?__timestamp=1610939816970&categoryId=1005000');
      */
      // 请求网络数据
      let result = await axios(
        `http://localhost:8080/list/categoryId=${categoryId}.json`
      );

      this.categoryData = result.data.data;
    },
    // 顶部导航栏选项切换的回调
    topNavHandleSelect(index) {
      /* 
       由于之前绑定的是网易接口的url 
       例如: https://m.you.163.com/item/list?categoryId=1005000&style=pd
       需要截取字符串获得id
       然后根据categoryId请求数据， 这里为提高加载速度采用本地加载
      */
      // 判断是否切回主页
      if (index === "https://m.you.163.com/item/newItem") {
        this.ActiveCategoryId = 11;
        return;
      }
      /* 
        截取字符串获得categoryId
      */
      let params = Urlsub.UrlParamHash(index);
      let categoryId = params['categoryId'];
     

      if (!categoryId || categoryId == 11) return;
      this.getCategoryData(categoryId);
      this.ActiveCategoryId = categoryId;
    },
    // 顶部导航栏展开和隐藏的切换
    toggleTopNav() {
      this.topNavToggleActive = !this.topNavToggleActive;
    },
    // 点击遮罩层的回调
    hiddenMask() {
      this.topNavToggleActive = false;
    },
    // /item/list.json?__timestamp=1610767661486&style=pd&categoryId=1005000
    // 跳转至搜索组件
    goSearchPath() {
      this.$router.push("/search");
    },
    async getCarts() {
      // b9d5faab300c85400fbddcc414422450
      let result = await axios.post(
        "/api/xhr/cart/getCarts.json?csrf_token=b9d5faab300c85400fbddcc414422450"
      );

      console.log(result.data);
    },
  },
  components: {
    IndexComponent,
    CateListInfo,
  },
  created() {
    this.getIndexData();
    this.getCarts();
    this.$emit("change-index", 1);
  },
};
</script>

<style lang="less" scoped>
.hdWrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 750px;
    height: 1334px;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  .line {
    position: relative;
    display: flex;
    box-sizing: border-box;
    padding: 16px 30px;
    width: 750px;
    height: 88px;
    align-items: center;
    background-color: #ffffff;
    z-index: 9999;
    .logo {
      margin-right: 15px;
      font-family: "kaiTi";
      font-size: 36px;
      font-weight: 600;
      color: #1c1c1cdb;
    }

    .topSearchInput {
      display: flex;
      flex: 1;
      box-sizing: border-box;
      align-items: center;
      padding: 0 30px;
      width: 436px;
      height: 56px;
      color: #717171;
      border-radius: 10px;
      background-color: #eeeeee;

      .iconfont {
        margin-right: 10px;
        font-size: 32px;
        font-weight: 700;
      }

      span {
        font-size: 28px;
      }
    }

    .loginBtn {
      margin-left: 16px;
      width: 72px;
      height: 38px;
      line-height: 38px;
      text-align: center;
      color: #dd1a21;
      border: 1px solid #dd1a21bd;
      border-radius: 8px;
    }
  }

  .list {
    position: relative;
    z-index: 9999;

    .listContent {
      overflow: scroll;
      background-color: #ffffff;

      &::-webkit-scrollbar {
        background-color: transparent;
        height: 0px;
      }

      .el-menu-demo {
        display: flex;
        width: 0px;
        padding: 0 30px;
        white-space: nowrap !important;
        border-bottom: none !important;

        .el-menu-item {
          box-sizing: border-box;
          padding: 0 10px;
          margin: 0 20px;
          height: 60px;
          line-height: 60px;
          color: #333333;
        }

        .is-active {
          border-bottom: 5px solid #dd1a21;
          color: #dd1a21;
        }
      }
    }

    .moreContent {
      position: relative;
      padding-top: 60px;
      background-color: #ffffff;
      z-index: 10000;

      .title {
        position: absolute;
        top: 0;
        left: 0;
        padding-left: 35px;
        height: 60px;
        line-height: 60px;
        font-size: 28px;
        color: #666666;
      }

      .el-menu-demo {
        .el-menu-item {
          display: inline-block;
          margin: 0 0 40px 30px;
          padding: 0;
          width: 150px;
          height: 54px;
          line-height: 54px;
          text-align: center;
          background-color: #fafafa;
          color: #333333;
          border: 1px solid #cccccc !important;
          border-radius: 5px;
        }
        .is-active {
          color: #dd1a21;
          border: 1px solid #dd1a21 !important;
        }
      }
    }
  }

  .toggle {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 60px;
    background: linear-gradient(90deg, #ffffff00 0, #ffffff 30%);
    z-index: 10000;

    .iconfont {
      position: absolute;
      top: 50%;
      right: 30%;
      font-size: 40px;
      color: #3333339c;
      transform: translateY(-50%) rotate(90deg);
      // transform: translateY(-50%) rotate(270deg);
    }
  }

  .toggle.toggleActive {
    .iconfont {
      // transform: translateY(-50%) rotate(90deg);
      transform: translateY(-50%) rotate(270deg);
    }
  }
}

.indexContent,
.cateListContent {
  margin-top: 152px;
}
</style>>