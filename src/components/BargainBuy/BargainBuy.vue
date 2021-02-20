<template>

  <div class="container" @scroll="scrollEvent">
    <div class="bargainBuyWrapper" >
      <!-- 头部 -->
      <div class="hd-wrapper">
        <img class="title" src="http://yanxuan.nosdn.127.net/0b7676e645253f84be662aacfc051922.png" alt="">
        <div class="text">严选好物,用心生活</div>
        <img class="bg" src="http://yanxuan.nosdn.127.net/a93a392fb8006ba26dea38477979b7b4.jpg?imageView" alt="">

        <!-- 轮播 -->
        <swiper :options="swiperOption" v-if="navWapData">
          <swiper-slide v-for="(item, index) in navWapData.navList" :key="index">
            <img :src="item.picUrl" alt class="topPic" />
            <div class="mainText">{{item.mainTitle}}</div>
            <div class="descText">{{item.viceTitle}}</div>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>

      <div class="mainWrapper" v-if="recAuto">

        <!-- 循环列表 -->
        <div class="col" v-for="(item,index) in recAuto.result " :key="index">
          <!-- 列表头部活动部分 -->
          <div class="item">
            <div class="imgWrapper">
              <img class="img" :src="recManual[0].topics[index].newAppBanner || recManual[0].topics[index].picUrl" alt="">
            </div>
            <div class="desc">{{recManual[0].topics[index].title}}</div>
            <div class="detail">
              <div class="useInfo">
                <img :src="recManual[0].topics[index].avatar" alt="" class="avatar">
                <div class="nickname">{{recManual[0].topics[index].nickname}}</div>
              </div>
              <div class="upArea">
                <img class="hand" src="https://yanxuan.nosdn.127.net/5097bc5f2e1eb15f2a32b56895db073a.png?imageView&quality=65&thumbnail=48y48" alt="">
                <div class="upText">{{recManual[0].topics[index].readCount}}</div>
              </div>
            </div>
          </div>

          <div class="item" v-for="(item1,index) in item.topics" :key="index">
            <div class="imgWrapper">
              <img class="img" v-if="item1.newAppBanner" :src="item1.newAppBanner+'?imageView&thumbnail=345y345&quality=85'" alt="">
              <img class="img" v-else :src="item1.picUrl" alt="">
            </div>
            <div class="desc">{{item1.title}}</div>
            <div class="detail">
              <div class="useInfo">
                <img :src="item1.avatar" alt="" class="avatar">
                <div class="nickname">{{item1.nickname}}</div>
              </div>
              <div class="upArea">
                <div class="upText">{{item1.readCount}}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      navWapData: {},
      swiperOption: {
        // 图片切换速度
        speed: 1000,
        // 分页器配置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        slidesPerView: 4,
        slidesPerColumn: 2,
        // 修改swiper自己或子元素时，自动初始化swiper
        observer: true,
        // 修改swiper的父元素时，自动初始化swiper
        observeParents: true,
      },
      recManual: {},
      recAuto: {},
      page: 1,
    };
  },
  methods: {
    async getNavWap() {
      let result = await axios("/api/topic/v1/know/navWap.json");
      this.navWapData = result.data.data;
    },
    async getRecManual() {
      /* let result = await axios("http://localhost:8080/recManual.json"); */
      let result = await axios("/api/topic/v1/find/recManual.json");
      this.recManual = result.data.data;
    },
    async getTopics() {
      console.log('发起数据请求');
      let result = await axios(`/api/topic/v1/find/recAuto.json?page=${this.page}&size=2`);
      // this.recAuto = result.data.data;
      if(!this.recAuto.result){
        this.recAuto = result.data.data;
      }else {
        this.recAuto.result[0].topics.push(...result.data.data.result[0].topics)
        this.recAuto.result[1].topics.push(...result.data.data.result[1].topics)
      }
    },
    // 监听滚动条的回调
    scrollEvent(e){
      // console.log(e);
      if(e.srcElement.scrollTop+e.srcElement.offsetHeight>=e.srcElement.scrollHeight){ 
         console.log('下拉触底的回调');
         this.page += 1;
         this.getTopics();
         // this.loadMore();    //加载更多
      }
    }
  },
  created() {
    this.getNavWap();
    this.getRecManual();
    this.getTopics();
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  overflow: scroll;
}
.bargainBuyWrapper {
  .hd-wrapper {
    position: relative;

    .title {
      position: absolute;
      top: 30px;
      left: 10px;
      width: 65px;
      height: 34.5px;
      z-index: 1;
    }
    .text {
      display: inline-block;
      position: relative;
      top: 42px;
      left: 80px;
      font-size: 15px;
      color: #ffffff;
      z-index: 2;
    }
    .bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 259px;
    }
  }

  .swiper-container {
    margin-top: 110px;
    width: 710px;
    background-color: #ffffff;
    border-radius: 16px;

    ::v-deep .swiper-wrapper {
      flex-direction: row !important;
    }

    .swiper-slide {
      margin-top: 20px !important;
      height: 200px;
      text-align: center;

      .topPic {
        display: block;
        margin: 0 auto;
        width: 120px;
        height: 120px;
      }

      .mainText {
        margin-top: 8 px;
        height: 40px;
        line-height: 40px;
        font-size: 28px;
        color: #333333;
      }

      .descText {
        height: 30px;
        line-height: 30px;
        font-size: 24px;
        color: #999999;
      }
    }

    .swiper-pagination {
      position: relative;
      top: 0;
      left: 0;
      margin: 20px;

      ::v-deep .swiper-pagination-bullet {
        margin: 0;
        padding: 0;
        width: 40px;
        height: 4px;
      }
      ::v-deep .swiper-pagination-bullet-active {
        background-color: #dd1a21;
      }
    }
  }

  .mainWrapper {
    display: flex;
    justify-content: space-evenly;

    .col {
      width: 340px;

      .item {
        margin-top: 40px;
        width: 100%;
        background-color: #ffffff;
        border-radius: 10px;
        overflow: hidden;

        .imgWrapper {
          .img {
            width: 100%;
            vertical-align: middle;
          }
        }

        .desc {
          padding: 18px 16px 0;
          font-size: 28px;
          line-height: 28px;
          color: #333333;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .detail {
          position: relative;
          padding: 20px 10px;
          color: #7f7f7f;

          .useInfo {
            .avatar {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              vertical-align: bottom;
            }
            .nickname {
              display: inline-block;
              margin-left: 20px;
              line-height: 48px;
            }
          }

          .upArea {
            position: absolute;
            top: 50%;
            right: 10px;
            line-height: 48px;
            transform: translateY(-50%);

            .hand {
              width: 32px;
              height: 32px;
              vertical-align: middle;
            }

            .upText {
              margin-left: 10px;
              display: inline-block;
            }
          }
        }
      }
    }
  }
}
</style>