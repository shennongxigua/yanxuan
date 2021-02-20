<template>
  <div class="rpList-wrapper">
    <div class="col1">
      <div :class="['redpakcet',type==3 && 'overdue']" v-for="item in dataCol1" :key="item.id">
        <div class="cover">
          <div class="top"></div>
          <div class="bottom"></div>
        </div>
        <div class="content">
          <div class="line1">{{ item.type }}</div>
          <div class="line2">
            <span class="money">{{ item.money }}</span>
            <span class="unit">元</span>
          </div>
          <div class="line3">
            <span class="time"
              >{{ item.startTime | dateformat("YYYY年MM月DD日") }}-{{
                item.endTime | dateformat("YYYY年MM月DD日")
              }}</span
            >
          </div>
        </div>
        <div class="foot">
          <div class="useCondition">
            <span :class="['word', !item.isMore && 'fold']">
              {{ item.remark }}
            </span>
            <span
              :class="['iconWrapper', item.isMore && 'active']"
              @click="toggleFold(item.id)"
            >
              <i class="iconfont icon-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="col2">
      <div :class="['redpakcet',type==3 && 'overdue']" v-for="item in dataCol2" :key="item.id">
        <div class="cover">
          <div class="top"></div>
          <div class="bottom"></div>
        </div>
        <div class="content">
          <div class="line1">{{ item.type }}</div>
          <div class="line2">
            <span class="money">{{ item.money }}</span>
            <span class="unit">元</span>
          </div>
          <div class="line3">
            <span class="time"
              >{{ item.startTime | dateformat("YYYY年MM月DD日") }}-{{
                item.endTime | dateformat("YYYY年MM月DD日")
              }}</span
            >
          </div>
        </div>
        <div class="foot">
          <div class="useCondition">
            <span :class="['word', !item.isMore && 'fold']">
              {{ item.remark }}
            </span>
            <span
              :class="['iconWrapper', item.isMore && 'active']"
              @click="toggleFold(item.id)"
            >
              <i class="iconfont icon-arrow-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Moment from "moment";
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      myData: [],
      dataCol1: [],
      dataCol2: [],
    };
  },
  methods: {
    init() {
      this.myData = this.data.filter((item, index) => {
        item.isMore = false;
        if (index % 2 === 0) {
          this.dataCol1.push(item);
        } else {
          this.dataCol2.push(item);
        }
        return item;
      });
    },
    toggleFold(id) {
      this.myData = this.myData.filter((item) => {
        item.id === id && (item.isMore = !item.isMore);
        return item;
      });
    },
  },
  watch: {
    data() {
      return this.init();
    },
    myData() {
      let data1 = [];
      let data2 = [];
      this.myData.filter((item, index) => {
        if (index % 2 === 0) {
          data1.push(item);
        } else {
          data2.push(item);
        }
      });
      this.dataCol1 = data1;
      this.dataCol2 = data2;
    },
  },
  created() {
    this.init();
  },
};
</script>
<style lang="less" scoped>
.rpList-wrapper {
  display: flex;
  width: 375px;
  .col1 {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0 7.5px 0 15px;
    width: 50%;
  }

  .col2 {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0 15px 0 7.5px;
    width: 50%;
  }

  .redpakcet {
    margin-bottom: 15px;
    overflow: hidden;
    border-radius: 4px;
    background: linear-gradient(-1deg, #ec6f73 0, #f5948b 100%);

    .cover {
      height: 35px;
      .top {
        height: 50%;
        background: linear-gradient(-180deg, #f48f88 0, #f28884 100%);
      }
      .bottom {
        height: 50%;
        overflow: hidden;
        background: linear-gradient(-1deg, #f0807f 0, #f28884 98%);
        border-radius: 0 0 50% 50%/0 0 100% 100%;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 20px 15px 0;
      height: 95px;
      color: #ffffff;

      .line1 {
        font-size: 14px;
      }

      .line2 {
        margin-top: 2px;
        font-size: 30px;

        .unit {
          font-size: 18px;
        }
      }

      .line3 {
        margin-top: 10px;
        .time {
          display: inline-block;
          white-space: nowrap;
          font-size: 20px;
          transform: scale(0.5);
        }
      }
    }

    .foot {
      position: relative;
      color: #ffffff;

      .useCondition {
        padding: 9px 15px 30px;

        .word {
          display: block;
        }

        .word.fold {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          word-break: break-all;
        }

        .iconWrapper {
          position: absolute;
          bottom: 5px;
          left: 50%;
          text-align: center;
          color: #ffffff9e;
          transform: translateX(-50%) rotate(90deg);
        }

        .iconWrapper.active {
          transform: translateX(-50%) rotate(270deg);
        }
      }
    }
  }
  .redpakcet.overdue {
    background: linear-gradient(-1deg, #b6bac3 0, #b8bcc3 98%);

    .top {
    background: linear-gradient(-180deg,#B9BEC8 0,#B5BAC4 100%);
    }

    .bottom {
            background: linear-gradient(-1deg,#B2B7C1 0,#B5BAC4 98%);
    }
    // .iconWrapper {
    //     color: #ffffff;
    // }
  }
}
</style>