<template>
    <el-container class="cateListWrapper">
      <el-header class="headerWrapper">
        <!-- 头部搜索框 -->
        <div class="topSarchInput">
          <i class="iconfont icon-sousuo"></i>
          <span @click="goSearchPath">搜索商品, 共50317款好物</span>
        </div>
      </el-header>

      <el-container class="mainWrapper">
        <el-aside>
          <!-- 左侧导航栏 -->

          <el-menu
            :default-active="'' + currentCategory.id"
            active-text-color="#ab2b2b"
            @select="handleSelect"
          >
            <el-menu-item v-for="item in categoryL1List" :key="item.id" :index="'' + item.id">
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 右侧数据展示 -->
          <div v-if="currentCategory.bannerUrl ">
            <img class="banner" :src="currentCategory.bannerUrl" />
          </div>
          <swiper :options="swiperOption" v-else-if="!currentCategory.bannerUrl">
            <swiper-slide v-for="item in currentCategory.bannerList" :key="item.id">
              <img :src="item.picUrl" alt class="banner" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>

          <!-- 数据列表 -->
          <div class="cateList" v-for="item in categoryGroupList" :key="item.id">
            <!-- 二级标题 -->
            <div class="hd">{{item.name}}</div>
            <div class="list">
              <!-- 列表数据 -->
              <div class="listItem" v-for="datalist in item.categoryList" :key="datalist.id">
                <img :src="datalist.wapBannerUrl" alt class="cateimg" />
                <div class="name">{{datalist.name}}</div>
              </div>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      categoryL1List: [], // 一级列表
      currentCategory: {}, // 当前类别
      categoryGroupList: [], // 当前类别列表
      swiperOption: {
        // 分页器配置
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        // 设定初始化时slide的索引
        initialSlide: 0,
        //Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)
        direction: "horizontal",
        // 环状轮播
        loop: true,
        slidesPerView: "auto",
        loopedSlides: 3,
        loopAdditionalSlides: 0,
        // 一个屏幕展示的数量
        slidesPerView: 1,
        // 间距
        // spaceBetween: 26,
        // 修改swiper自己或子元素时，自动初始化swiper
        observer: true,
        // 修改swiper的父元素时，自动初始化swiper
        observeParents: true
      }
    };
  },
  methods: {
    async getCateListData(categoryId = "11") {
      /* 
        请求本地数据
        let result = await axios(`http://localhost:8080/cateList/categoryId=${categoryId}.json`);
      */
      // 请求网络数据
      let result = await axios(
        `/api/item/cateList.json?__timestamp=${+new Date()}&categoryId=${categoryId}`
      );
      let {
        categoryL1List,
        currentCategory,
        categoryGroupList
      } = result.data.data;
      this.categoryL1List = categoryL1List;
      this.currentCategory = currentCategory;
      this.categoryGroupList = categoryGroupList;
    },
    // 导航栏切换的回调
    handleSelect(id) {
      this.getCateListData(id);
    },
    // 跳转至搜索组件
    goSearchPath(){
      this.$router.push('/search');
    }
  },
  created() {
    this.getCateListData();
  }
};
</script>

<style lang="less" scoped>
.cateListWrapper {
  height: 100%;
  ::v-deep .el-header {
    display: flex;
    align-items: center;
    padding: 0 30px;
    height: 88px !important;
    background-color: #ffffff;
    border-bottom: 1px solid #eeeeee;

    .topSarchInput {
      width: 100%;
      height: 56px;
      background-color: #eee;
      border-radius: 8px;
      text-align: center;
      line-height: 56px;
      color: #666666;
      font-size: 28px;
      // font-family: 'PingFangSC-Light';

      .iconfont {
        margin-right: 6px;
        font-size: 28px;
        font-weight: 700;
      }
    }
  }

  .mainWrapper {
    height: ceil(1334 - 88px);
    background-color: #ffffff;

    .el-aside {
      width: 160px !important;
      border-right: 1px solid #eeeeee;

      .el-menu {
        border-right: solid 1px transparent;

        .el-menu-item {
          box-sizing: border-box;
          margin-top: 40px;
          padding: 0 !important;
          width: 100%;
          height: 50px;
          font-size: 28px;
          line-height: 50px;
          text-align: center;
        }
        .is-active {
          position: relative;
        }
        .is-active::before {
          content: " ";
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          width: 8px;
          background-color: #ab2b2b;
        }
      }
    }

    .el-main {
      padding: 30px;
      margin-bottom: 44px;

      .banner {
        width: 528px;
        height: 192px;
      }

      .swiper-pagination {
        ::v-deep .swiper-pagination-bullet {
          width: 40px;
          height: 6px;
          border-radius: 10%;
          background: #ffffff;
          opacity: 0.5;
        }
        ::v-deep .swiper-pagination-bullet-active {
          opacity: 1;
        }
      }

      .cateList {
        .hd {
          font-weight: 700;
          font-size: 28px;
          margin: 40px 0 32px;
        }

        .list {

          .listItem {
            display: inline-block;
            width: 144px;
            height: 216px;
            margin-right: 32px;
            margin-bottom: 20px;
            text-align: center;

            .cateimg {
              width: 144px;
              height: 144px;
            }
          }
        }
      }
    }
  }
}
</style>