<template>
  <div class="cartWrapper">
    <div class="hdWrapper">
      <div class="hd">
        <div class="left">
          <div class="title">购物车</div>
        </div>
        <div class="right">
          <div class="imgWrapper" v-if="token">
            <div class="img">
              领劵
              <div class="img-tag1"></div>
              <div class="img-tag2"></div>
            </div>

          </div>
          <div class="edit" v-if="token">编辑</div>
          <div class="edit" v-else-if="!token" style="color: #dd1a21">领劵</div>
        </div>
      </div>
    </div>

    <!-- 服务政策 -->
    <div class="indexServicePolicy">
      <div class="item">
        <i class="icon"></i>
        <span>30天无忧退货</span>
      </div>
      <div class="item">
        <i class="icon"></i>
        <span>48小时快速退款</span>
      </div>
      <div class="item">
        <i class="icon"></i>
        <span>满99元免邮费</span>
      </div>
    </div>

    <!-- 未登录默认限时 -->
    <div class="defaaultpage" v-if="!token">
      <img class="img" src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noCart-d6193bd6e4.png?imageView&type=webp" alt="">
      <div class="toLoginBtn" @click="loginHandle">登录</div>
    </div>
    <!-- 登录时展示购物车 -->
    <div v-if="token">
      <div class="promotionsModule" v-if="netEaseData.postageVO">

        <div class="freight-msg" v-if="netEaseData.postageVO.showTip">
          {{netEaseData.postageVO.postageTip}}
        </div>

        <div class="promotionsTitle">
          <span class="tag">全场换购</span>
          <div class="text">{{netEaseData.cartGroupList[0].promTip}}</div>
          <div class="more">在逛逛
            <i class="iconfont icon-arrow-right"></i>

          </div>
        </div>

        <div class="promtionsContent">
          <div class="link">
            去换购商品
            <i class="iconfont icon-arrow-right"></i>
          </div>
        </div>

      </div>

      <product-list :list-data="netEaseData" @toggle="toggle($event)" @more="more($event)" @less="less($event)" @remove="remove($event)" @edit="edit($event)"></product-list>

      <div class="footer">

        <div class="account">
          <div class="left">
            <div :class="['checkAll',checkAll && 'checkbox'] " @click="toggleAll"></div>
            <div class="text">已选({{ num }})</div>
          </div>
          <div class="right">
            <div class="total">
              合计:￥{{total}}
            </div>
            <div class="subBtn">
              下单
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ProductList from "./ProductList.vue";
import axios from "axios";
export default {
  data() {
    return {
      token: "",
      checkAll: false,
      netEaseData: {},
    };
  },
  methods: {
    // 获取数据
    async getNetEase() {
      let result = await axios("http://localhost:8080//netEase.json");
      this.netEaseData = result.data.data;
    },
    // 选中状态切换的回调
    toggle(keyId) {
      let index = this.netEaseData.cartGroupList[1].cartItemList.findIndex(
        (item) => item.uniqueKey === keyId
      );
      this.netEaseData.cartGroupList[1].cartItemList[index].checked = !this
        .netEaseData.cartGroupList[1].cartItemList[index].checked;

      // 切换完毕后判断是否全选或全不选
      let flag = true;
      if (this.netEaseData.cartGroupList) {
        this.netEaseData.cartGroupList[1].cartItemList.filter((item) => {
          item.checked === false && (flag = false);
        });
        this.checkAll = flag;
      }
      console.log(flag);
    },
    // 添加数量
    more(keyId) {
      let index = this.netEaseData.cartGroupList[1].cartItemList.findIndex(
        (item) => item.uniqueKey === keyId
      );
      this.netEaseData.cartGroupList[1].cartItemList[index].cnt =
        Number.parseInt(
          this.netEaseData.cartGroupList[1].cartItemList[index].cnt
        ) + 1;
    },
    // 减少数量
    less(keyId) {
      let index = this.netEaseData.cartGroupList[1].cartItemList.findIndex(
        (item) => item.uniqueKey === keyId
      );
      this.netEaseData.cartGroupList[1].cartItemList[index].cnt -= 1;
    },
    // 编辑数量的回调
    edit(keyId, val) {
      console.log(keyId, val);
      let index = this.netEaseData.cartGroupList[1].cartItemList.findIndex(
        (item) => item.uniqueKey === keyId
      );
      this.netEaseData.cartGroupList[1].cartItemList[index].cnt = val;
    },
    // 删除商品
    remove(keyId) {
      let index = this.netEaseData.cartGroupList[1].cartItemList.findIndex(
        (item) => item.uniqueKey === keyId
      );
      this.netEaseData.cartGroupList[1].cartItemList.splice(index, 1);
    },
    // 全选切换的回调
    toggleAll() {
      this.checkAll = !this.checkAll;
      this.netEaseData.cartGroupList[1].cartItemList.forEach((item) => {
        item.checked = this.checkAll;
      });
    },
    // 登录的回调
    loginHandle() {
      this.$router.push("login");
    },
  },
  computed: {
    total() {
      let total = 0;
      if (this.netEaseData.cartGroupList) {
        this.netEaseData.cartGroupList[1].cartItemList.forEach(
          (item, index) => {
            if (item.checked == true) {
              total += item.cnt * item.actualPrice;
            }
          }
        );
      }
      return total;
    },
    num() {
      let num = 0;
      if (this.netEaseData.cartGroupList) {
        this.netEaseData.cartGroupList[1].cartItemList.filter((item) => {
          if (item.checked == true) {
            num += 1;
          }
        });
      }
      return num;
    },
  },
  components: {
    ProductList,
  },
  created() {
    this.getNetEase();
    this.token = localStorage.getItem("xg_token");
  },
};
</script>

<style lang="less" scoped>
.cartWrapper {
  width: 750px;
  height: 100%;

  .hdWrapper {
    height: 88px;
  }
  .hd {
    position: fixed;
    box-sizing: border-box;
    padding: 0 20px;
    width: 100%;
    height: 88px;
    background-color: #ffffff;
    color: #333333;
    border-bottom: 1px solid #d9d9d9;
    z-index: 999;

    .left {
      float: left;
      line-height: 88px;
      .title {
        font-size: 32px;
      }
    }

    .right {
      position: relative;
      float: right;
      box-sizing: border-box;
      width: 160px;
      height: 100%;

      .img {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 0;
        width: 72px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        border-radius: 1px;
        background-color: #fd7a5f;
        color: #ffffff;
        transform: translateY(-50%);

        .img-tag1,
        .img-tag2 {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #ffffff;
        }
        .img-tag1 {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-50%, -50%);
        }
        .img-tag2 {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translate(50%, -50%);
        }
      }

      .edit {
        text-align: right;
        line-height: 88px;
        font-size: 28px;
      }
    }
  }

  .promotionsModule {
    margin-top: 10px;
    background-color: #ffffff;

    .freight-msg {
      padding: 0 30px;
      height: 80px;
      line-height: 80px;
      color: #f48f18;
      background-color: #fff8d7;
      font-size: 30px;
    }

    .promotionsTitle {
      display: flex;
      align-items: center;
      padding: 0 30px;
      height: 72px;

      .tag {
        width: 112px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #ffffff;
        border-radius: 4px;
        background: linear-gradient(45deg, #fd865f, #fc635f);
      }
      .text {
        margin-left: 14px;
        font-size: 28px;
        color: #333333;
      }

      .more {
        margin-left: 80px;
        font-size: 28px;
        color: #dd1b21;
      }
    }
    .promtionsContent {
      height: 72px;

      .link {
        margin: 0 30px 0 85px;
        padding: 0 20px;
        height: 56px;
        line-height: 56px;
        background-color: #fff8f7;

        .iconfont {
          float: right;
          color: #666666;
        }
      }
    }
  }

  .footer {
    position: absolute;
    left: 0;
    bottom: 88px;
    width: 100%;
  }

  .account {
    display: flex;
    align-items: center;
    padding: 0 0 0 30px;
    height: 110px;
    background-color: #ffffff;
    border-top: 1px solid #d9d9d9;

    .left {
      display: flex;
      width: 30%;
      height: 36px;

      .checkAll {
        width: 38px;
        height: 38px;
        background: url(../../assets/icons/1d547ff8-3988-4bbf-acc4-d58485740435.png);
        background-position: 0 -184px;
        background-size: 38px 526px;
      }
      .checkbox {
        background-position: 0 -232px;
      }

      .text {
        margin-left: 20px;
        font-size: 28px;
        color: #666666;
      }
    }

    .right {
      display: flex;
      justify-content: flex-end;
      text-align: right;
      align-items: center;
      width: 70%;
      height: 100%;

      .total {
        padding: 0 10px;
        height: 36px;
        margin-right: 10px;
        font-size: 28px;
        color: #dd1b21;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .subBtn {
        min-width: 220px;
        height: 100%;
        line-height: 110px;
        font-size: 28px;
        text-align: center;
        color: #ffffff;
        background-color: #dd1b21;
      }
    }
  }

  .indexServicePolicy {
    display: flex;
    white-space: nowrap;
    align-items: center;
    padding: 0 10px;
    height: 72px;
    color: #666666;

    .item {
      padding: 0 10px;
      flex: 1;
      text-align: center;

      .icon {
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        border: 1px solid #7f7f7f;
        transform: translateY(-50%);
      }
      span {
        display: inline-block;
        margin-left: 8px;
        height: 32px;
        line-height: 32px;
      }
    }
  }

  .defaaultpage {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: ceil(587 * 2px);
    background-color: #f4f4f4;

    .img {
      margin: 0 auto 30px;
      width: 248px;
      height: 248px;
    }

    .toLoginBtn {
      margin: 0 135px;
      height: 92px;
      line-height: 92px;
      text-align: center;
      font-size: 30px;
      color: #ffffff;
      background-color: #dd1a21;
    }
  }
}
</style>