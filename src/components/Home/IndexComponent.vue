<template>
  <div class="indexWrapper" v-if="data.focusList">
    <!-- 回到顶部 -->

    <!--轮播图 -->
    <swiper :options="swiperOption" v-if="data.focusList.length > 1">
      <swiper-slide v-for="item in data.focusList" :key="item.id">
        <img :src="item.picUrl" alt class="banner" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <!-- 服务政策 -->
    <div class="indexServicePolicy">
      <div class="item" v-for="item in data.policyDescList" :key="item.desc">
        <img class="icon" :src="item.icon" alt />
        <span>{{ item.desc }}</span>
      </div>
    </div>

    <!-- 分类导航 -->
    <div class="listWrapper" v-if="data.kingKongModule">
      <div class="item" v-for="item in data.kingKongModule.kingKongList" :key="item.text">
        <img class="img" :src="item.picUrl" alt />
        <div class="txt">{{item.text}}</div>
      </div>
    </div>

    <!-- 大图导购 -->
    <div class="indexBigPromotionModule" v-if="data.policyDescList">
      <div class="promotionItem1">
        <a href="#">
          <img :src="data.bigPromotionModule.floorList[0].cells[0].picUrl" alt />
        </a>
      </div>
      <!-- <div class="promotionItem2">
        <a href="#">
          <img :src="data.bigPromotionModule.floorList[1].cells[0].picUrl" alt />
        </a>
      </div> -->
      <div class="promotionItem3">
        <a href="#">
          <img :src="data.bigPromotionModule.floorList[1].cells[0].picUrl" alt />
        </a>
        <a href="#">
          <img :src="data.bigPromotionModule.floorList[1].cells[1].picUrl" alt />
        </a>
      </div>
    </div>

    <!-- 商品主体 -->
    <div class="page-content">
      <!-- 新人专享礼 -->
      <div class="indexListItemWrapper" v-if="data.indexActivityModule">
        <div class="listContent newuseModule">
          <div class="hd-title">
            <span>新人专享礼</span>
          </div>
          <div class="content">
            <div class="left">
              <div class="name">新人专享礼包</div>
              <div class="imgWrapper">
                <img src="http://yanxuan.nosdn.127.net/352b0ea9b2d058094956efde167ef852.png" alt />
              </div>
            </div>
            <div class="right">
              <div class="module1">
                <div class="title" v-if="data.indexActivityModule[0].title">{{data.indexActivityModule[0].title}}</div>
                <div class="subTitle" v-if="data.indexActivityModule[0].subTitle">{{data.indexActivityModule[0].subTitle}}</div>
                <div class="tag" v-if="data.indexActivityModule[0].tag">{{data.indexActivityModule[0].tag}}</div>
                <div class="picWrapper">
                  <!-- 图片 -->
                  <div class="img">
                    <img :src="data.indexActivityModule[0].picUrl" alt />
                  </div>
                  <!-- 折扣 -->
                  <div class="discount">
                    <!-- 原价 -->
                    <div class="activityPrice">{{data.indexActivityModule[0].activityPrice}}</div>
                    <!-- 折扣价 -->
                    <del class="originPrice">{{data.indexActivityModule[0].originPrice}}</del>
                  </div>
                </div>
              </div>
              <div class="module2">
                <div class="title" v-if="data.indexActivityModule[1].title">{{data.indexActivityModule[1].title}}</div>
                <div class="subTitle" v-if="data.indexActivityModule[1].subTitle">{{data.indexActivityModule[1].subTitle}}</div>
                <div class="tag" v-if="data.indexActivityModule[1].tag">{{data.indexActivityModule[1].tag}}</div>
                <div class="picWrapper">
                  <!-- 图片 -->
                  <div class="img">
                    <img src="https://yanxuan-item.nosdn.127.net/74662d24f6d217b520178c5a6d031457.png?quality=75&type=webp&imageView&thumbnail=200x200" alt />
                  </div>
                  <!-- 折扣 -->
                  <div class="discount">
                    <!-- 原价 -->
                    <div class="activityPrice">{{data.indexActivityModule[1].activityPrice}}</div>
                    <!-- 折扣价 -->
                    <del class="originPrice">{{data.indexActivityModule[1].originPrice}}</del>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 类目热销榜 -->
      <div class="indexListItemWrapper" v-if="data.categoryHotSellModule">
        <div class="listContent categoryHotSellModule">
          <!-- 标题 -->
          <div class="hd-title">
            <span>{{data.categoryHotSellModule.title}}</span>
          </div>
          <div class="content">
            <div class="itemWrapper" v-for="item in data.categoryHotSellModule.categoryList" :key="item.categoryName">
              <div class="item">
                <div class="name">{{item.categoryName}}</div>
                <div class="imgWrapper">
                  <img :src="item.showPicUrl" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <!-- 限时购 -->
      <div class="indexListItemWrapper" v-if="data.flashSaleModule">
        <div class="listContent flashSaleModule">
          <div class="hd-title">
            <div class="left">
              <span>限时购</span>
              <!-- remainTime 倒计时毫秒 -->
              <!-- <span>{{data.flashSaleModule.remainTime}}</span> -->
              <div class="countdown">
                <span class="hours">{{ hours }}</span>
                <span class="colon">:</span>
                <span class="mins">{{ mins }}</span>
                <span class="colon">:</span>
                <span class="secs">{{ secs }}</span>
              </div>

            </div>
            <div class="right">
              <span class="more">
                更多
                <i class="iconfont icon-arrow-right"></i>
              </span>
            </div>
          </div>
          <div class="content">
            <div class="item" v-for="item in data.flashSaleModule.itemList" :key="item.itemId">
              <div class="imgWrapper">
                <img :src="item.picUrl" alt />
              </div>
              <div class="price">
                <span class="actualPrice">￥{{item.activityPrice}}</span>
                <span class="retailPrice">￥{{item.originPrice}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 新品首发  newItemList-->
      <div class="indexListItemWrapper" v-if="data.newItemList">
        <div class="listContent newItemList">
          <div class="hd-title">
            <div class="left">
              <span>新品首发</span>
            </div>
            <div class="right">
              <span class="more">
                更多
                <i class="iconfont icon-arrow-right"></i>
              </span>
            </div>
          </div>
          <div class="content">
            <div class="item" v-for="(item, index) in data.newItemList.slice(0,6)" :key="index">
              <div class="imgWrapper">
                <img :src="item.listPicUrl+'?type=webp&imageView&quality=65&thumbnail=330x330'" alt />
              </div>
              <div class="name">{{item.name}}</div>
              <div class="price">￥{{item.retailPrice}}</div>
              <div class="tag" v-if="item.itemTagList[1]">{{item.itemTagList[1].name}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 底部导购 sceneLightShoppingGuideModule -->
      <div class="indexListItemWrapper" v-if="data.sceneLightShoppingGuideModule">
        <div class="listContent sceneLightShoppingGuideModule">
          <div class="content">
            <div class="item" v-for="(item,index) in data.sceneLightShoppingGuideModule" :key="index">
              <div class="title">{{item.styleItem.title}}</div>
              <div class="desc">{{item.styleItem.desc}}</div>
              <div class="imgWrapper">
                <img :src="picUrl+'?quality=75&type=webp&imageView&thumbnail=150x150'" alt v-for="(picUrl,index) in item.styleItem.picUrlList" :key="index" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 页脚 -->
      <div class="footerWrapper">
        <div class="footerConter">
          <div class="bd">
            <a href="#" class="goApp">下载APP</a>
            <a href="#" class="goWeb">电脑版</a>
          </div>
          <div class="copyright">
            网易公司版权所有 © 1997-
            <br />食品经营许可证：JY13301080111719
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["data"],
  data() {
    return {
      compdata: {},
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
      countdown: 0,
    };
  },
  methods: {
    fromatCountdow() {},
    upCountdow() {
      if (this.countdown <= 0) return;
      let timer;
      timer = setInterval(() => {
        this.countdown = this.countdown - 1000;
        // console.log(this.countdown);
        if (this.countdown < 0) return clearInterval(timer); // 倒计时结束重新请求数据
      }, 1000);
    },
  },
  watch: {
    data() {
      this.compdata = this.data;
    },
    /*  限时购模块
    compdata() {
      this.countdown = this.compdata.flashSaleModule.remainTime;
      this.upCountdow();
    }, */
  },
  computed: {
    hours() {
      let hours = 0;
      hours = 12 - moment(this.countdown).format("H");
      hours = hours < 10 ? "0" + hours : hours;
      return hours;
    },
    mins() {
      let mins = 0;
      mins = moment(this.countdown).format("m");
      mins = mins < 10 ? "0" + mins : mins;
      return mins;
    },
    secs() {
      let secs = 0;
      secs = moment(this.countdown).format("s");
      secs = secs < 10 ? "0" + secs : secs;
      return secs;
    },
  },
  created() {
    // this.upCountdow();
  },
};
</script>

<style lang="less" scoped>
.indexWrapper {
  background-color: #eeeeee;
  margin-bottom: 88px;

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

  .indexServicePolicy {
    display: flex;
    white-space: nowrap;
    align-items: center;
    padding: 0 10px;
    height: 72px;
    background-color: #ffffff;

    .item {
      padding: 0 10px;
      flex: 1;

      .icon {
        width: 32px;
        height: 32px;
        vertical-align: bottom;
      }
      span {
        display: inline-block;
        margin-left: 8px;
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .listWrapper {
    display: flex;
    flex-wrap: wrap;
    padding-bottom: 32px;
    background-color: #ffffff;

    .item {
      width: 20%;
      height: 170px;
      text-align: center;
      .img {
        width: 100px;
        height: 100px;
      }
      .txt {
        margin-top: 10px;
        color: #333333;
      }
    }
  }

  .indexBigPromotionModule {
    display: flex;
    flex-direction: column;
    padding-bottom: 30px;
    background: linear-gradient(#ffffff, #eeeeee);
    width: 100%;

    .promotionItem1 {
      a img {
        height: 320px;
      }
    }

    .promotionItem2 {
      margin: 16px auto 6px;
      a img {
        height: 80px;
      }
    }

    .promotionItem3 {
      display: flex;
      margin: 0 10px;
      justify-content: space-evenly;

      a img {
        height: 186px;
      }
    }
  }

  .page-content {
    .indexListItemWrapper {
      margin-bottom: 20px;
      background-color: #ffffff;

      .listContent {
        padding: 0 30px 30px;
        .hd-title {
          height: 90px;
          line-height: 90px;
          font-size: 32px;
          color: #333333;
        }
      }
    }
  }

  .page-content {
    .indexListItemWrapper {
      .newuseModule {
        padding: 0 30px 40px;

        .hd-title {
          text-align: center;

          span {
            position: relative;
          }

          span::before {
            content: "";
            position: absolute;
            box-sizing: border-box;
            display: inline-block;
            top: 50%;
            left: -30%;
            width: 30px;
            height: 0px;
            border: 1px solid #333333;
          }

          span::after {
            content: "";
            position: absolute;
            box-sizing: border-box;
            display: inline-block;
            top: 50%;
            right: -30%;
            width: 30px;
            height: 0px;
            border: 1px solid #333333;
          }
        }

        .content {
          display: flex;

          .left {
            width: 50%;
            background-color: #f9e9cf;
            border-radius: 6px;

            .name {
              font-size: 32px;
              padding: 30px 0 0 30px;
              color: #666666;
            }
            .imgWrapper {
              padding: 37px 0;
              text-align: center;

              img {
                width: 258px;
                height: 258px;
              }
            }
          }

          .right {
            display: flex;
            flex-direction: column;
            width: 50%;

            .module1 {
              position: relative;
              box-sizing: border-box;
              margin: 0 0 6px 6px;
              padding: 20px 0 0 30px;
              width: 100%;
              height: 50%;
              background-color: #fbe2d3;
            }

            .module2 {
              position: relative;
              box-sizing: border-box;
              margin: 0 0 0 6px;
              padding: 20px 0 0 30px;
              width: 100%;
              height: 50%;
              background-color: #ffecc2;
            }

            .title {
              height: 42px;
              line-height: 42px;
              font-size: 32px;
              color: #333333;
            }

            .subTitle {
              height: 36px;
              line-height: 36px;
              font-size: 24px;
              color: #7f7f7f;
            }

            .tag {
              display: inline-block;
              padding: 0 10px;
              color: #ffffff;
              background-color: #cbb693;
              border-radius: 4px;
            }

            .picWrapper {
              position: absolute;
              display: flex;
              top: 0;
              right: 0;
              width: 50%;
              height: 100%;

              .img {
                width: 100%;
                height: 100%;

                img {
                  width: 100%;
                  height: 100%;
                }
              }

              .discount {
                position: absolute;
                box-sizing: border-box;
                top: 10%;
                right: 10%;
                padding: 10px 0;
                width: 80px;
                height: 80px;
                text-align: center;
                background-color: #f59524;
                border-radius: 50%;
                opacity: 0.8;
                color: #ffffff;
              }
            }
          }
        }
      }

      .categoryHotSellModule {
        .content {
          display: flex;
          flex-wrap: wrap;

          .itemWrapper {
            box-sizing: border-box;
            width: 25%;
            padding: 0 10px 10px 0;

            .item {
              background-color: #f5f5f5;
              height: 180px;
              text-align: center;

              .name {
                padding-top: 10px;
                color: #333333;
              }

              .imgWrapper {
                display: inline-block;
                text-align: center;
                width: 120px;
                height: 120px;

                img {
                  padding-top: 10px;
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }

          .itemWrapper:nth-child(1),
          .itemWrapper:nth-child(2) {
            box-sizing: border-box;
            width: 50%;
            padding: 0 10px 10px 0;
            height: 200px;

            .item {
              position: relative;
              height: 100%;

              .name {
                position: relative;
                padding: 66px 20px 0;
                text-align: left;
                font-size: 28px;
              }

              .name::before {
                content: "";
                position: absolute;
                bottom: -20px;
                width: 40px;
                height: 0px;
                border: 2px solid #333333;
              }

              .imgWrapper {
                position: absolute;
                top: 0;
                right: 0;
                width: 200px;
                height: 100%;

                img {
                  padding: 0;
                }
              }
            }
          }

          .itemWrapper:nth-child(1) .item {
            background-color: #f9f3e4;
          }

          .itemWrapper:nth-child(2) .item {
            background-color: #ebeff6;
          }
        }
      }

      .flashSaleModule {
        color: #333333;

        .left {
          display: flex;
          float: left;
          font-size: 32px;

          .countdown {
            display: flex;
            align-items: center;
            .hours,
            .mins,
            .secs {
              display: inline-block;
              margin: 0 10px;
              width: 36px;
              height: 36px;
              line-height: 36px;
              text-align: center;
              color: #ffffff;
              background-color: #333333;
              border-radius: 8px;
            }
          }
        }
        .right {
          float: right;
          font-size: 28px;
          line-height: 88px;

          .iconfont {
            font-size: 32px;
            vertical-align: middle;
          }
        }

        .content {
          display: flex;
          width: 100%;
          flex-wrap: wrap;
          justify-content: space-between;

          .item {
            width: 216px;
            padding-bottom: 20px;

            .imgWrapper {
              background-color: #eeeeee;
              img {
                width: 216px;
                height: 216px;
                vertical-align: middle;
              }
            }

            .price {
              padding: 10px 10px 0 10px;
              text-align: center;
              .actualPrice {
                font-size: 28px;
                color: #dd1a21;
                margin-right: 10px;
              }
              .retailPrice {
                color: #7f7f7f;
                text-decoration: line-through;
              }
            }
          }
        }
      }

      .newItemList {
        .left {
          float: left;
          font-size: 32px;
        }

        .right {
          float: right;
          font-size: 28px;
        }

        .content {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          width: 100%;

          .item {
            width: 30%;
            margin-bottom: 20px;

            .imgWrapper {
              width: 216px;
              height: 216px;
              background-color: skyblue;

              img {
                width: 100%;
                height: 100%;
              }
            }

            .name {
              margin-top: 10px;
            }

            .price {
              height: 48px;
              font-size: 32px;
              line-height: 48px;
              color: #dd1a21;
            }

            .tag {
              display: inline-block;
              margin-left: -10px;
              padding: 6px 10px;
              color: #dd1a21;
              border: 1px solid #dd21a1;
              border-radius: 24px;
              transform: scale(0.7);
            }
          }
        }
      }

      .sceneLightShoppingGuideModule {
        .content {
          display: flex;
          margin-left: -8px;
          justify-content: space-between;
          padding-top: 20px;

          .item {
            width: 49%;
            padding: 20px 0 0 20px;
            margin-left: 8px;
            background-color: #f5f5f5;

            .title {
              line-height: 48px;
              font-size: 32px;
            }

            .desc {
              line-height: 36px;
              font-size: 24px;
              color: #7f7f7f;
            }

            .imgWrapper {
              img {
                width: 150px;
                height: 150px;
              }
            }
          }
        }
      }
    }

    .footerWrapper {
      .footerConter {
        box-sizing: border-box;
        padding: 54px 40px 30px;
        height: 240px;
        background-color: #414141;

        .bd {
          display: flex;
          justify-content: center;
          transform: translateX(15px);

          .goApp,
          .goWeb {
            display: inline-block;
            margin-right: 30px;
            width: 170px;
            height: 60px;
            color: #ffffff;
            text-align: center;
            line-height: 60px;
            border: 1px solid #6c6c6c;
            border-radius: 5px;
          }
        }

        .copyright {
          margin-top: 40px;

          text-align: center;
          color: #999999;
        }
      }
    }
  }
}
</style>