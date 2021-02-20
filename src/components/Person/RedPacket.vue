<template>
  <div>
    <!-- 头部 -->
    <top-nav-logo></top-nav-logo>

    <div class="redPacketWrapper">
      <div class="menuWrapper">
        <el-menu
          default-active="1"
          class="el-menu-demo"
          @select="handleSelect"
          mode="horizontal"
          background-color="#fafafa"
          text-color="#333333"
          active-text-color="#dd1a21"
        >
          <el-menu-item index="1">未使用</el-menu-item>
          <el-menu-item index="2">已使用</el-menu-item>
          <el-menu-item index="3">已失效</el-menu-item>
        </el-menu>
      </div>
      <!-- 使用说明 -->
      <div class="helpLinkWarpper">
        <div class="helpLinkConten">
          <i class="iconfont icon-question"></i>
          <a href="#" class="link">使用说明</a>
        </div>
      </div>
      <re-list-component
        :data="rpListData"
        :type="activeIndex"
      ></re-list-component>
    </div>
  </div>
</template>

<script>
import TopNavLogo from '../../components/TopNavLogo/TopNavLogo.vue'
import reListComponent from "./RedPacketListComponent";
export default {
  data() {
    return {
      redPacketListData: [
        {
          id: 1,
          type: "新人红包",
          isUntapped: true,
          money: 30,
          discounts: 149,
          startTime: 1610208000000,
          endTime: 1612886400000,
          remark:
            "满149元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 2,
          type: "新人红包",
          isUntapped: false,
          money: 40,
          discounts: 149,
          startTime: 1610208000000,
          endTime: 1612886400000,
          remark:
            "满149元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 3,
          type: "新人红包",
          isUntapped: true,
          money: 50,
          discounts: 149,
          startTime: 1610208000000,
          endTime: 1612886400000,
          remark:
            "满149元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 4,
          type: "新人红包",
          isUntapped: false,
          money: 60,
          discounts: 149,
          startTime: 1609430400000,
          endTime: 1610208000000,
          remark:
            "满149元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 5,
          type: "新人红包",
          isUntapped: true,
          money: 70,
          discounts: 149,
          startTime: 1609430400000,
          endTime: 1610208000000,
          remark:
            "满149元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 6,
          type: "新人红包",
          isUntapped: true,
          money: 80,
          discounts: 149,
          startTime: 1609430400000,
          endTime: 1610208000000,
          remark:
            "满149元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 7,
          type: "新人红包",
          isUntapped: true,
          money: 90,
          discounts: 149,
          startTime: 1609430400000,
          endTime: 1610208000000,
          remark:
            "满149元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 8,
          type: "新人红包",
          isUntapped: true,
          money: 100,
          discounts: 149,
          startTime: 1609430400000,
          endTime: 1640966400000,
          remark:
            "满149元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 9,
          type: "新人红包",
          isUntapped: true,
          money: 300,
          discounts: 349,
          startTime: 1609430400000,
          endTime: 1640966400000,
          remark:
            "满349元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 10,
          type: "新人红包",
          isUntapped: true,
          money: 300,
          discounts: 349,
          startTime: 1609430400000,
          endTime: 1640966400000,
          remark:
            "满349元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 11,
          type: "新人红包",
          isUntapped: true,
          money: 300,
          discounts: 349,
          startTime: 1609430400000,
          endTime: 1640966400000,
          remark:
            "满349元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 12,
          type: "新人红包",
          isUntapped: false,
          money: 300,
          discounts: 349,
          startTime: 1609430400000,
          endTime: 1640966400000,
          remark:
            "满349元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
        {
          id: 13,
          type: "新人红包",
          isUntapped: false,
          money: 300,
          discounts: 349,
          startTime: 1609430400000,
          endTime: 1640966400000,
          remark:
            "满349元可用；仅限新用户；新人专享、礼品卡、猪肉卡、黑胶唱片、部分新品、秒杀商品和加价购商品以及商详页标明不可用红包商品不可使用",
        },
      ],
      activeIndex: "1", //  1-->未使用  2-->已使用   3-->已过期
    };
  },
  methods: {
    handleSelect(index) {
      this.activeIndex = index;
    },
  },
  computed: {
    rpListData() {
      let data = [];
      console.log(+new Date());
      if (this.activeIndex == 1) {
        data = this.redPacketListData.filter(
          (item) => item.isUntapped && item.endTime  > +new Date()
        );
      } else if (this.activeIndex == 2) {
        data = this.redPacketListData.filter((item) => !item.isUntapped);
      } else if (this.activeIndex == 3) {
        data = this.redPacketListData.filter(
          (item) => item.isUntapped && item.endTime  < +new Date()
        );
      }
      return data;
    },
  },
  components: {
    TopNavLogo,
    reListComponent,
  },
};
</script>

<style lang="less" scoped>
.redPacketWrapper {
  position: relative;
  box-sizing: border-box;
  padding-top: 88px;
  background-color: #ffffff;
  height: 1334px;
  z-index: 999;
  overflow: scroll;

  .menuWrapper {
    .el-menu {
      display: flex;
      justify-content: space-evenly;
      padding: 0 60px;
    }

    .el-menu-item {
      margin: 0 80px;
      padding: 0;
      height: 60px;
      line-height: 60px;
      background-color: #fafafa !important;
    }
  }

  .helpLinkWarpper {
    box-sizing: border-box;
    height: 70px;
    padding: 0 30px;

    .helpLinkConten {
      float: right;
      height: 70px;
      line-height: 70px;
      text-align: center;
      color: #a2a2a2;

      .link {
        margin-left: 10px;
        color: #a2a2a2;
      }
    }
  }
}
</style>