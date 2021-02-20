<template>
  <div class="cateListWrapper" v-if="data.currentCategory">
    <!--轮播图 -->
    <swiper :options="swiperOption">
      <swiper-slide v-for="(item, index) in data.currentCategory.bannerList" :key="index">
        <img :src="item.picUrl" alt class="banner" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <!-- 主体 -->
    <div class="listWrapper" v-if="data.categoryItemList">
      <!-- 类别 -->
      <div class="categoryList" v-for="(categoryList, index) in data.categoryItemList" :key="index">
        <div class="hd">
          <p class="name">{{ categoryList.category.name }}</p>
          <p class="desc">{{ categoryList.category.frontName }}</p>
        </div>
        <div class="list">
          <div class="item" v-for="(item, index) in categoryList.itemList" :key="index">
            <!-- 图片区域 -->
            <div class="imgWrapper">
              <img class="img" :src="item.listPicUrl +'?type=webp&imageView&quality=65&thumbnail=330x330'" alt="" />
              <!-- 基本描述 simpleDesc -->
              <div v-if="item.listPromBanner">
                <div class="promContent" v-if="item.listPromBanner.valid" :style="'background-image: url(' + item.listPromBanner.bannerContentUrl +');'">
                  <div class="left" :style="'background-image: url(' +item.listPromBanner.bannerTitleUrl +');'">
                    <span>{{ item.listPromBanner.promoTitle }}</span>
                    <span>{{ item.listPromBanner.promoSubTitle }}</span>
                  </div>
                  <span class="right">{{item.listPromBanner.content}}</span>
                </div>
                <div class="desc" v-else-if="!item.listPromBanner.valid">
                  {{ item.simpleDesc }}
                </div>
              </div>
              <div class="desc" v-else>
                {{ item.simpleDesc }}
              </div>
              <!-- 促销logo -->
              <img class="promologo" v-if="item.promLogo" :src="item.promLogo.logoUrl" alt="" />
            </div>
            <!-- 商品名称 -->
            <div class="name">{{ item.name }}</div>
            <!-- 价格 -->
            <div class="price">
              <!-- 折扣 -->
              <span class="retailPrice">￥{{ item.retailPrice }}</span>
              <!-- 原价 -->
              <span class="counterPrice" v-if="item.counterPrice">￥{{ item.counterPrice }}</span>
            </div>
            <!-- 标志 -->
            <div class="tag" v-if="item.promTag">{{ item.promTag }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["categoryData"],
  data() {
    return {
      data: {},
      swiperOption: {
        // 自动轮播
        autoplay: true,
        // 每张播放时长3秒，自动播放
        delay: 10000,
        // 图片切换速度
        speed: 1000,
        // 分页器配置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
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
        observeParents: true,
      },
    };
  },
  methods: {},
  watch: {
    categoryData() {
      this.data = this.categoryData;
    },
  },
};
</script>

<style lang="less" scoped>
.cateListWrapper {
  .swiper-container {
    .swiper-slide {
      display: flex;
      align-items: center;
      height: 300px;
      z-index: 99;
    }
    .banner {
      width: 750px;
      height: 370px;
      z-index: 99;
    }

    .swiper-pagination {
      ::v-deep .swiper-pagination-bullet {
        width: 40px;
        height: 4px;
        border-radius: 2px;
        background-color: #ffffff;
        opacity: 0.3;
        z-index: 99;
      }
      ::v-deep .swiper-pagination-bullet-active {
        opacity: 1;
      }
    }
  }

  .listWrapper {
    .categoryList {
      margin-top: 20px;
      background-color: #fff;

      .hd {
        display: flex;
        height: 120px;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .name {
          font-size: 32px;
          color: #333333;
        }
        .desc {
          font-size: 24px;
          margin-top: 10px;
          color: #999999;
        }
      }

      .list {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 345px;
          margin-left: 20px;
          margin-bottom: 30px;

          .imgWrapper {
            position: relative;

            .img {
              width: 345px;
              height: 345px;
              vertical-align: bottom;
            }

            .desc {
              box-sizing: border-box;
              padding: 0 10px;
              height: 48px;
              line-height: 48px;
              color: #875d2a;
              background-color: #f8e4cc;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .promContent {
              position: relative;
              color: #ffffff;
              height: 48px;
              line-height: 48px;

              .left {
                float: left;
                padding: 7px;
                background-size: auto 100%;
                background-position: right 0px;
                border-top-left-radius: 10px;
                transform: translateY(-18px);
                span {
                  display: block;
                  height: 24px;
                  line-height: 24px;
                  font-weight: 500;
                  transform: scale(0.8);
                }
              }

              .right {
                position: absolute;
                padding-left: 10px;
                text-align: center;
              }
            }

            .promologo {
              position: absolute;
              top: 10px;
              left: 10px;
              width: 72px;
              height: 72px;
            }
          }

          .name {
            margin-top: 16px;
            color: #333333;
            font-size: 28px;
          }

          .price {
            display: flex;
            align-items: center;
            height: 48px;
            line-height: 48px;

            .retailPrice {
              font-size: 32px;
              color: #dd1a21;
            }

            .counterPrice {
              font-size: 24px;
              margin-left: 10px;
              color: #999999;
              text-decoration: line-through;
            }
          }

          .tag {
            display: inline-block;
            margin-left: -10px;
            padding: 6px;
            color: #dd1a21;
            border: 1px solid #dd1a21;
            border-radius: 24px;
            transform: scale(0.7);
          }
        }
      }
    }
  }
}
</style>

