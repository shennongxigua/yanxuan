<template>
  <div class="personWrapper">
    <!-- 头部 start -->
    <div class="person-header">
      <div class="left">
        <img src="http://yanxuan.nosdn.127.net/8945ae63d940cc42406c3f67019c5cb6.png" class="avater" />
        <div class="info">
          <p class="nickname">用户1231232161112254</p>
          <div class="membershipLevel">普通用户</div>
        </div>
      </div>
      <div class="right">
        <!-- 二维码 -->
        <i class="icon-QRCode iconfont icon-erweima-01"></i>
        <!-- pro会员 -->
        <div class="superEntranc">
          <i class="icon-ProLogo iconfont icon-jifenzhongxin1"></i>
          <div class="word">
            <div>Pro会员</div>
            <div>立即使用 <i class="iconfont icon-xiayibu"></i></div>
          </div>
        </div>
      </div>
    </div>

    <div class="myAsset">
      <h2 class="tt">我的资产</h2>
      <div class="assetList">
        <div class="assetItem">
          <p class="assetCount">
            <span class="unit">￥</span><span class="value">0</span>
          </p>
          <p class="aseetName">余额</p>
        </div>
        <div class="assetItem">
          <router-link to="/redPacket">
            <p class="assetCount">
              <span class="unit"></span><span class="value">0</span>
            </p>
            <p class="aseetName">红包</p>
          </router-link>
        </div>
        <div class="assetItem">
          <router-link to="/discount">
            <p class="assetCount">
              <span class="unit"></span><span class="value">0</span>
            </p>
            <p class="aseetName">优惠券</p>
          </router-link>
        </div>
        <div class="assetItem">
          <p class="assetCount">
            <span class="unit">￥</span><span class="value">0</span>
          </p>
          <p class="aseetName">津贴</p>
        </div>
        <div class="assetItem">
          <p class="assetCount">
            <span class="unit"></span><span class="value">0</span>
          </p>
          <p class="aseetName">礼品卡</p>
        </div>
      </div>

      <!-- 活动推荐 -->
      <div class="monthcard">
        <div class="content">
          <i class="iconfont icon-xinbaniconshangchuan-"></i>
          <span><b> 省钱月卡</b> | 可领取40元无门槛红包</span>
          <span class="right">￥5.1购买</span>
        </div>
      </div>
    </div>
    <!-- 头部 end -->

    <!-- 功能模块 start -->
    <div class="menu">
      <ul class="list clearfix">
        <li class="item">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item item-bottom">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
        <li class="item item-bottom">
          <a href="#" class="menuItem">
            <i class="iconfont icon-wodedingdan"></i>
            <span>我的订单</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- 功能模块 end -->

    <!-- 退出按钮 start -->
    <div class="btnWrapper">
      <button @click="lotoutHandle">退出登录</button>
    </div>
    <!-- 退出按钮 end -->
  </div>
</template>

<script>
export default {
  methods: {
    lotoutHandle() {
      localStorage.removeItem("xg_token");
      this.$router.push("home");
    },
  },
  created() {
    if (!localStorage.getItem("xg_token")) {
      this.$router.push('login')
    }
  },
};
</script>

<style lang="less" scoped>
.personWrapper {
  height: 1670px;
}
.person-header {
  display: flex;
  box-sizing: border-box;
  justify-content: space-around;
  align-items: center;
  padding-left: 30px;
  width: 100%;
  height: 270px;
  background-image: url(../../assets/images/5905098f74e04c39fa5e76ebb9ff591b.webp);
  background-size: 100%;

  .left {
    display: flex;
    align-items: center;
    padding: 64px 0;
    width: 510px;
    height: 142px;

    .avater {
      width: 142px;
      height: 142px;
      border-radius: 50%;
      vertical-align: middle;
    }

    .info {
      flex: 1;
      margin-left: 30px;
      color: #ffffff;

      .nickname {
        margin-bottom: 10px;
        width: 338px;
        font-size: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .membershipLevel {
        font-size: 28px;
      }
    }
  }

  .right {
    position: relative;
    width: 200px;
    height: 200px;

    .icon-QRCode {
      position: absolute;
      top: 20%;
      right: 15%;
      font-size: 46px;
    }

    .superEntranc {
      display: flex;
      box-sizing: border-box;
      padding-left: 20px;
      align-items: center;
      margin-top: 116px;
      width: 100%;
      height: 84px;
      background-image: linear-gradient(180deg, #574e44 0, #0e0e0e 100%);
      border-top-left-radius: 42px;
      border-bottom-left-radius: 42px;

      .icon-ProLogo {
        font-size: 40px;
        color: #f9e0c0;
      }

      .word {
        color: #f9e0c0;
      }
    }
  }
}

.myAsset {
  margin-bottom: 30px;
  background-color: #ffffff;

  .tt {
    margin-left: 30px;
    height: 105px;
    line-height: 105px;
    font-size: 28px;
    font-weight: 300;
    border-bottom: 1px solid rgb(217, 217, 217);
  }

  .assetList {
    display: flex;

    .assetItem {
      width: 20%;
      box-sizing: border-box;
      padding-top: 32px;
      height: 160px;
      text-align: center;
      color: #333333;

      .assetCount {
        height: 48px;
        line-height: 48px;
        font-weight: 700;

        .value {
          font-size: 32px;
        }
      }

      .aseetName {
        // display: inline-block;
        height: 36px;
        line-height: 36px;
        font-size: 24px;
      }
    }
  }

  .monthcard {
    margin: 20px 0;
    padding: 0 20px 20px;

    .content {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      padding: 0 20px;
      width: 710px;
      height: 90px;
      background-color: #fae9e5;
      border-radius: 20px;
      color: #dd1a21;

      .iconfont {
        font-size: 44px;
      }

      span.right {
        margin-left: 106px;
        padding: 0 20px;
        height: 38px;
        line-height: 38px;
        border: 1px solid rgba(221, 26, 33, 0.5);
        border-radius: 25px;
      }
    }
  }
}

.menu {
  margin-bottom: 40px;
  // margin-bottom: 20px;

  .list {
    background-color: #ffffff;

    .item {
      box-sizing: border-box;
      float: left;
      width: 250px;
      height: 180px;
      text-align: center;
      border-bottom: 1px solid #eeeeee;
      border-right: 1px solid #eeeeee;

      .menuItem {
        display: flex;
        flex-direction: column;
        .iconfont {
          padding-top: 45px;
          margin-bottom: 16px;
          font-size: 50px;
        }
      }
    }

    .item-bottom {
      border-bottom: none;
    }
  }
}

.btnWrapper {
  height: 96px;
  font-size: 28px;

  button {
    width: 100%;
    height: 100%;
    border: none;
    background-color: #ffffff;
    outline: none;
  }
  button:active {
    background-color: #eeeeee;
  }
}
</style>