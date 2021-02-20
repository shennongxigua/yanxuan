<template>
  <ul class="couponListWrapper">
    <!-- 未过期的优惠券 -->
    <li class="couponItem" v-for="item in isUseData" :key="item.id">
      <div class="tag">
        <span>{{ item.type }}</span>
      </div>
      <div class="content">
        <div class="left">
          <div class="desc">
            <span>{{ item.discounts }}</span>
            <span class="unit">元</span>
          </div>
        </div>
        <div class="right">
          <div class="name">
            {{ "满" + item.condition + "减" + item.discounts }}
          </div>
          <div class="validTime">
            <span>{{ item.startTime | dateformat("YYYY.MM.DD") }}-{{ item.endTime | dateformat("YYY.MM.DD") }}</span>
          </div>
        </div>
      </div>
      <div class="couponLink"></div>
      <div class="bottom" @click="toggleInfo(item.id)">
        <div class="useCondition">
          <span :class="item.isShowMore ? '' : 'txt-overflow'">{{
            item.remark
          }}</span>
          <div :class="[item.isShowMore && 'more', 'iconWrapper']">
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </li>
    <!-- 分割线 -->
    <div class="couponTitle">
      <span class="title">已失效</span>
    </div>
    <!-- 过期的优惠券 -->
    <li class="couponItem overdue" v-for="item in overdueData" :key="item.id">
      <div class="tag">
        <span>{{ item.type }}</span>
      </div>
      <div class="content">
        <div class="left">
          <div class="desc">
            <span>{{ item.discounts }}</span>
            <span class="unit">元</span>
          </div>
        </div>
        <div class="right">
          <div class="name">
            {{ "满" + item.condition + "减" + item.discounts }}
          </div>
          <div class="validTime">
            <span>{{ item.startTime | dateformat("YYYY.MM.DD") }}-{{ item.endTime | dateformat("YYY.MM.DD") }}</span>
          </div>
        </div>
      </div>
      <div class="couponLink"></div>
      <div class="bottom" @click="toggleInfo(item.id)">
        <div class="useCondition">
          <span :class="item.isShowMore ? '' : 'txt-overflow'">{{
            item.remark
          }}</span>
          <div :class="[item.isShowMore && 'more', 'iconWrapper']">
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      myData: [],
      isUseData: [],
      overdueData: [],
    };
  },
  methods: {
    // 切换是否显示全部信息的回调
    toggleInfo(id) {
      this.myData = this.myData.filter((item) => {
        item.id === id && (item.isShowMore = !item.isShowMore);
        return item;
      });
    },
  },
  watch:{
    myData(){
      let nowTime = +new Date();
      this.data.forEach((item) => {
        if(item.endTime >= nowTime){
          this.isUseData.push(item);
        }else{
          this.overdueData.push(item);
        }
      });
      
    }
  },
  created() {
    this.myData = this.data.filter((item) => {
      item.isShowMore = false;
      return item;
    });
  },
};
</script>

<style lang="less" scoped>
.couponListWrapper {
  box-sizing: border-box;
  width: 750px;
  padding: 0 30px 40px  ;

  .couponItem {
    position: relative;
    background-color: #f28b84;
    border-radius: 8px;
    margin-bottom: 40px;

    .tag {
      position: absolute;
      top: 14px;
      left: -10px;
      display: inline-block;
      padding: 0 16px;
      height: 32px;
      line-height: 32px;
      color: #fff;
      background-color: #cc5253;
      border-radius: 4px;

      span {
        display: inline-block;
        font-size: 12px;
        transform: scale(0.8);
      }
    }

    .content {
      box-sizing: border-box;
      padding-top: 40px;
      height: 170px;

      .left {
        display: flex;
        justify-content: center;
        align-items: center;
        float: left;
        width: 216px;
        height: 100%;

        .desc {
          font-size: 64px;
          line-height: 96px;
          color: #fff;

          .unit {
            font-size: 36px;
          }
        }
      }

      .right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        float: left;
        width: 430px;
        height: 100%;
        color: #ffffff;

        .name {
          font-size: 28px;
        }

        .validTime {
          span {
            display: inline-block;
            white-space: nowrap;
            font-size: 40px;
            transform: scale(0.5) translateX(-50%);
          }
        }
      }
    }

    .couponLink {
      height: 6px;
      background-image: url(../../assets/images/semiCircle-8716430b1b.png);
      background-size: 20px 6px;
    }

    .bottom {
      position: relative;
      padding: 24px 40px;
      background-color: rgba(0, 0, 0, 0.08);

      .useCondition {
        margin-right: 64px;

        span {
          color: #fff;
          line-height: 30px;
        }

        .txt-overflow {
          display: inline-block;
          width: 100%;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .iconWrapper {
          position: absolute;
          top: 30px;
          right: 30px;
          color: #ffffff;
          transition: all 1s initial;
          transform: rotate(90deg);
        }
        .iconWrapper.more {
          transform: rotate(270deg);
        }
      }
    }
  }

  .couponTitle {
    position: relative;
    height: 50px;
    border-top: 1px solid #a2a5ae;

    .title {
      display: inline-block;
      position: absolute;
      padding: 2px 20px;
      top: 0;
      left: 50%;
      color: #a2a5ae;
      background-color: #f4f4f4;
      transform: translate(-50%,-50%);
    }
  }

  .couponItem.overdue {
    background-image: linear-gradient(to right, rgb(182, 186, 195), rgb(184, 188, 195));
    
    .tag {
      background-color: #a2a5ae;
    }
  }
}
</style>