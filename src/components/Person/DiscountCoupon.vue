<template>
  <div class="dcWrapper">
    <!-- 头部 -->
    <top-nav-logo></top-nav-logo>
    <!-- 兑换优惠吗 -->
    <div class="couponActivateForm">
      <div class="row">
        <el-input
          class="couponFormInput"
          type="text"
          v-model="couponActivateInput"
          placeholder="请输入优惠码"
          clearable
        ></el-input>
        <el-button class="couponFormBtn">兑换</el-button>
      </div>
    </div>
    <!-- 使用说明 -->
    <div class="helpLinkWarpper">
      <div class="helpLinkConten">
        <i class="iconfont icon-question"></i>
        <a href="#" class="link">使用说明</a>
      </div>
    </div>
    <!-- 列表 -->
    <coupon-list-component :data='couponListData'></coupon-list-component>
    
  </div>
</template>



<script>
import TopNavLogo from '../../components/TopNavLogo/TopNavLogo.vue'
import CouponListComponent from './CouponListComponent'
export default {
  data() {
    return {
      couponActivateInput: "", // 兑换的优惠码
      couponListData: [
          { id: 1,type:'新人专享',condition: 299 ,discounts: 25, startTime: 1609430400000,endTime: 1641744000000, remark: '新用户专享；全场通用；限时购、特价等特惠商品不可使用；严选线下店不可用限时购、特价等特惠商品，新品及详情页标注不可用券的商品除外;严选线下门店不可用'},
          { id: 2,type:'新人专享',condition: 299 ,discounts: 25, startTime: 1609430400000,endTime: 1641744000000, remark: '新用户专享；全场通用；限时购、特价等特惠商品不可使用；严选线下店不可用限时购、特价等特惠商品，新品及详情页标注不可用券的商品除外;严选线下门店不可用'},
          { id: 3,type:'新人专享',condition: 299 ,discounts: 25, startTime: 1609430400000,endTime: 1641744000000, remark: '新用户专享；全场通用；限时购、特价等特惠商品不可使用；严选线下店不可用限时购、特价等特惠商品，新品及详情页标注不可用券的商品除外;严选线下门店不可用'},
          { id: 4,type:'新人专享',condition: 299 ,discounts: 25, startTime: 1609430400000,endTime: 1641744000000, remark: '新用户专享；全场通用；限时购、特价等特惠商品不可使用；严选线下店不可用限时购、特价等特惠商品，新品及详情页标注不可用券的商品除外;严选线下门店不可用'},
          { id: 5,type:'新人专享',condition: 299 ,discounts: 25, startTime: 1609430400000,endTime: 1610208000000, remark: '新用户专享；全场通用；限时购、特价等特惠商品不可使用；严选线下店不可用限时购、特价等特惠商品，新品及详情页标注不可用券的商品除外;严选线下门店不可用'},
          { id: 6,type:'新人专享',condition: 299 ,discounts: 25, startTime: 1609430400000,endTime: 1610208000000, remark: '新用户专享；全场通用；限时购、特价等特惠商品不可使用；严选线下店不可用限时购、特价等特惠商品，新品及详情页标注不可用券的商品除外;严选线下门店不可用'},
          { id: 7,type:'新人专享',condition: 299 ,discounts: 25, startTime: 1609430400000,endTime: 1610208000000, remark: '新用户专享；全场通用；限时购、特价等特惠商品不可使用；严选线下店不可用限时购、特价等特惠商品，新品及详情页标注不可用券的商品除外;严选线下门店不可用'},
          { id: 8,type:'新人专享',condition: 299 ,discounts: 25, startTime: 1609430400000,endTime: 1610208000000, remark: '新用户专享；全场通用；限时购、特价等特惠商品不可使用；严选线下店不可用限时购、特价等特惠商品，新品及详情页标注不可用券的商品除外;严选线下门店不可用'},
          { id: 9,type:'新人专享',condition: 299 ,discounts: 25, startTime: 1609430400000,endTime: 1610208000000, remark: '新用户专享；全场通用；限时购、特价等特惠商品不可使用；严选线下店不可用限时购、特价等特惠商品，新品及详情页标注不可用券的商品除外;严选线下门店不可用'},
      ] , // 优惠券数据
    };
  },
  components:{
    TopNavLogo,
    CouponListComponent,
  }
};
</script>

<style lang="less" scoped>
.dcWrapper {
  position: relative;
  min-height: 1334px;
  background-color: #eeeeee;
  z-index: 1000;

  .hdWraper {
    position: fixed;
    display: flex;
    top: 0;
    left: 0;
    box-sizing: border-box;
    padding: 0 20px;
    white-space: nowrap;
    width: 750px;
    height: 88px;
    line-height: 88px;
    font-size: 44px;
    background-color: #fafafa;
    border-bottom: 1px solid #eaeaea;
    z-index: 1000;

    .toHome-icon {
      width: 100px;
      font-size: 64px;
      color: #555e5a;
    }

    .toHome-logn {
      flex-grow: 1;
      text-align: center;
      font-size: 44px;
      font-family: 'kaiTi';
      color: #636265;
    }

    .right {
      width: 150px;

      .iconfont {
        margin-left: 20px;
        font-size: 54px;
        color: #555e5a;
      }
    }
  }

  .couponActivateForm {
    margin-top: 88px;
    box-sizing: border-box;
    padding: 20px 0;
    height: 110px;
    background-color: #fafafa;

    .row {
      display: flex;
      justify-content: space-evenly;

      .couponFormInput {
        width: 500px;
      }
      ::v-deep .couponFormInput > .el-input__inner {
        box-sizing: border-box;
        padding-left: 30px;
        width: 500px;
        height: 70px;
        font-size: 28px;
        border: 0.5px solid #eeeeee;
        border-radius: 10px;
        outline: none;
      }

      ::v-deep .couponFormBtn {
        padding: 0;
        width: 170px;
        height: 70px;
        line-height: 70px;
        color: #fafafa;
        background-color: #dd1a21;
        border: 1px solid transparent;
      }
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