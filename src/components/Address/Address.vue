<template>
  <div class="addressWrapper">
    <!-- 头部组件 -->
    <top-nav-logo></top-nav-logo>
    <div class="defaultpage" v-show="!isFrom">
      <!-- 内容列表区域 -->
      <div class="container" v-if="!isAddressList">
        <img
          class="img"
          src="http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/noAddress-c73987af41.png?imageView&type=webp"
          alt
        />
        <span class="txt">收货地址在哪里</span>
      </div>
      <!-- 地址列表组件 -->
      <div class="container listContainer" v-else>
        <div class="img"></div>
        <address-list-info
          :addlist="addressListInfo"
          @remove="removeAddById($event)"
          @editinfo="editInfo($event)"
        ></address-list-info>
      </div>
      <!-- 新建地址 -->
      <button class="addBtn" v-show="!isFrom" @click="setFrom(true)">
        + 新建地址
      </button>
    </div>
    <!-- 表单区域 -->
    <div class="addrespage" v-show="isFrom">
      <div class="addresFrom">
        <div class="row">
          <input type="text" placeholder="姓名" v-model="addFromName" />
        </div>
        <div class="row">
          <input type="text" placeholder="手机号" v-model="addFromPhone" />
        </div>
        <div class="row row1" @click="drawer = true">
          <input
            type="text"
            placeholder="省份、城市、区县"
            disabled
            v-model="addFromAddress"
          />
        </div>
        <div class="row row1 row2">
          <input
            type="text"
            placeholder="详细地址、如街道、楼盘号等"
            v-model="addFromDetailedAddress"
          />
        </div>
        <div class="chkbox">
          <i
            :class="['checkbox', isDefaultAddress && 'checked']"
            @click="changeChecked"
          ></i>
          <span>设为默认地址</span>
        </div>
      </div>
      <div class="btnContainer">
        <a href="#" class="addressBtn addressBtn1" @click="setFrom(false)"
          >取消</a
        >
        <a href="#" class="addressBtn addressBtn2" @click="subAddressFromHandle"
          >保存</a
        >
      </div>
    </div>
    <!-- 抽屉 -->
    <el-drawer
      :visible.sync="drawer"
      direction="btt"
      :before-close="handleClose"
      :with-header="false"
      :show-close="false"
      size="45%"
      ref="drawer"
    >
      <!-- 地址四级联动 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane
          v-if="addData.provinceName"
          :label="addData.provinceName"
          :name="addData.provinceName"
        >
          <!-- 省份数据 -->
          <ul class="itemList">
            <li
              class="item"
              v-for="item in provinceListData"
              :class="activeProvinceId == item.id && 'active'"
              :key="item.id"
              :data-id="item.id"
              :data-zonename="item.zonename"
              @click="clickProvinceHandle"
            >
              {{ item.zonename }}
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane
          v-if="addData.ctiyName"
          :label="addData.ctiyName"
          :name="addData.ctiyName"
        >
          <!-- 城市数据 -->
          <ul class="itemList">
            <li
              class="item"
              v-for="item in ctiyListData"
              :class="activeDistrctId == item.id && 'active'"
              :key="item.id"
              :data-id="item.id"
              :data-zonename="item.zonename"
              @click="clickCtiyHandle"
            >
              {{ item.zonename }}
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane
          v-if="addData.districtName"
          :label="addData.districtName"
          :name="addData.districtName"
        >
          <!-- 区县数据 -->
          <ul class="itemList">
            <li
              class="item"
              v-for="item in distrctListData"
              :class="activeDistrctId == item.id && 'active'"
              :key="item.id"
              :data-id="item.id"
              :data-zonename="item.zonename"
              @click="clickDistricHandle"
            >
              {{ item.zonename }}
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane
          v-if="addData.townName"
          :label="addData.townName"
          :name="addData.townName"
        >
          <!-- 街道/乡镇数据 -->
          <ul class="itemList">
            <li
              class="item"
              v-for="item in townListData"
              :class="activeTownId == item.id && 'active'"
              :key="item.id"
              :data-id="item.id"
              :data-zonename="item.zonename"
              @click="clickTownHandle"
            >
              {{ item.zonename }}
            </li>
          </ul>
        </el-tab-pane>
      </el-tabs>

      <button
        class="btn"
        :disabled="btnDisabled"
        :style="btnDisabled && 'color: #999999;'"
        @click="btnHandle"
      >
        确定
      </button>
    </el-drawer>
  </div>
</template>

<script>
import TopNavLogo from "../../components/TopNavLogo/TopNavLogo.vue";
import AddressListInfo from "../../components/Address/AddressListInfo.vue";
import axios from "axios";
export default {
  data() {
    return {
      isFrom: false, // 判断是否展示添加表单
      isDefaultAddress: false,
      drawer: false, // 抽屉展开的标识
      addFromName: "", // 姓名
      addFromPhone: "", // 电话
      addFromAddress: "", // 省份地址
      addFromDetailedAddress: "", // 详细地址
      provinceListData: [], // 省份数据
      ctiyListData: [], // 城市数据
      distrctListData: [], // 区县数据
      townListData: [], // 街道/乡镇数据
      activeName: "请选择",
      addData: {
        provinceName: "请选择",
        ctiyName: "", // 城市
        districtName: "", // 区县
        townName: "", // 街道/乡镇
      },
      activeProvinceId: "",
      activeCtiyId: "",
      activeDistrctId: "",
      activeTownId: "",
      btnDisabled: true, // 保存省份信息按钮的标识
      // 地址数据列表
      addressListInfo: [
        {
          zipCode: "",
          townName: "东华门街道",
          address: "1212",
          incompleteDesc: "",
          districtName: "东城区",
          mobile: "156****2118",
          cityId: 110100,
          completed: true,
          townId: 110101001000,
          provinceId: 110000,
          dft: true,
          districtId: 110101,
          cityName: "北京市",
          fullAddress: "北京市北京市东城区东华门街道1212",
          name: "lcb",
          id: 92750022,
          provinceName: "北京市",
        },
        {
          zipCode: "",
          townName: "佛祖岭街道",
          address: "wh",
          incompleteDesc: "",
          districtName: "江夏区",
          mobile: "156****2118",
          cityId: 420100,
          completed: true,
          townId: 420115086000,
          provinceId: 420000,
          dft: false,
          districtId: 420115,
          cityName: "武汉市",
          fullAddress: "湖北省武汉市江夏区佛祖岭街道wh",
          name: "lcb",
          id: 92727024,
          provinceName: "湖北省",
        },
      ],
    };
  },
  methods: {
    changeChecked() {
      this.isDefaultAddress = !this.isDefaultAddress;
    },
    setFrom(val) {
      this.isFrom = val;
    },
    // 获取省份数据
    async getProvinceJson() {
      let result = await axios.get(
        "/api/xhr/address/getProvince.json?withOverseasCountry=true"
      );
      this.provinceListData = result.data.data;
    },
    // 获取城市数据
    async getCityJson() {
      let result = await axios.get(
        `/api/xhr/address/getCity.json?csrf_token=579c449afa1e158d433542fa548cb847&parentId=${this.activeProvinceId}`
      );
      this.ctiyListData = result.data.data;
    },
    // 获取区县数据
    async getDistrctJson() {
      let result = await axios.get(
        `/api/xhr/address/getDistrict.json?grandParentId=${this.activeProvinceId}&parentId=${this.activeCtiyId}`
      );
      console.log(result.data);

      this.distrctListData = result.data.data;
    },
    // 获取街道/乡镇数据
    async getTownJson() {
      let result = await axios.get(
        `/api/xhr/address/getTown.json?&parentId=${this.activeTownId}`
      );
      this.townListData = result.data.data;
    },
    // tabs选中时触发
    handleClick() {},
    // 省份选中的回调
    async clickProvinceHandle(event) {
      this.activeProvinceId = event.currentTarget.dataset.id;
      this.activeCtiyId = this.activeProvinceId - 0 + 100;
      this.addData.provinceName = event.currentTarget.dataset.zonename;

      this.btnDisabled = true;
      await this.getCityJson();
      if (this.ctiyListData.length == 1) {
        // console.log("直接调区县");
        this.addData.districtName = "区县";
        this.addData.townName = "";
        this.activeName = "区县";
        this.getDistrctJson();
      } else {
        // console.log("调城市");
        this.addData.ctiyName = "城市";
        this.addData.districtName = "";
        this.addData.townName = "";
        this.activeName = "城市";
      }
    },
    // 城市选中的回调
    clickCtiyHandle(event) {
      console.log(event.currentTarget.dataset);
      this.activeCtiyId = event.currentTarget.dataset.id;
      this.activeDistrctId = this.activeProvinceId - 0 + 100;
      this.addData.ctiyName = event.currentTarget.dataset.zonename;
      this.addData.districtName = "区县";
      this.addData.townName = "";
      this.activeName = "区县";
      this.getDistrctJson();
    },
    // 区县选中的回调
    clickDistricHandle(event) {
      this.activeDistrctId = event.currentTarget.dataset.id;
      this.activeTownId = this.activeDistrctId;
      this.addData.districtName = event.currentTarget.dataset.zonename;
      this.addData.townName = "街道/乡镇";
      this.activeName = "街道/乡镇";
      this.btnDisabled = true;
      this.getTownJson();
    },
    // 街道/乡镇选中的回调
    clickTownHandle(event) {
      this.activeTownId = event.currentTarget.dataset.id;
      this.addData.townName = event.currentTarget.dataset.zonename;
      this.activeName = event.currentTarget.dataset.zonename;
      this.btnDisabled = false;
    },
    // 抽屉关闭的回调
    handleClose(done) {
      console.log("关闭了");
      done();
    },
    // 确定省份按钮的回调
    btnHandle() {
      this.addFromAddress =
        this.addData.provinceName +
        " " +
        this.addData.ctiyName +
        " " +
        this.addData.districtName +
        " " +
        this.addData.townName;
      this.$refs.drawer.closeDrawer();
    },
    // 保存地址表单的回调
    subAddressFromHandle() {
      if (this.isDefaultAddress) {
        this.addressListInfo = this.addressListInfo.filter((item) => {
          item.dft = false;
          return item;
        });
      }
      let id = +new Date(); // 随机的编号
      id = ("" + id).slice(-8);
      let addObj = {
        zipCode: "",
        townName: this.addData.townName,
        address: this.addFromDetailedAddress,
        incompleteDesc: "",
        districtName: this.addData.districtName,
        mobile: this.addFromPhone,
        cityId: this.activeCtiyId,
        completed: true,
        townId: this.activeTownId,
        provinceId: this.activeProvinceId,
        dft: this.isDefaultAddress,
        districtId: this.activeDistrctId,
        cityName: this.addData.cityName,
        fullAddress:
          this.addData.provinceName +
          this.addData.ctiyName +
          this.addData.districtName +
          this.addData.townName +
          this.addFromDetailedAddress,
        name: this.addFromName,
        id: id,
        provinceName: this.addData.provinceName,
      };
      this.addressListInfo.push(addObj);
      this.setFrom(false);
    },
    // 删除地址
    removeAddById(id) {
      this.addressListInfo = this.addressListInfo.filter(
        (item) => item.id != id
      );
    },
    // 修改地址
    editInfo(id) {

    },
  },
  computed: {
    isAddressList() {
      return this.addressListInfo.length;
    },
  },
  components: {
    TopNavLogo,
    AddressListInfo,
  },
  created() {
    this.getProvinceJson();
  },
};
</script>

<style lang="less" scoped>
.addressWrapper {
  position: relative;
  height: 100%;

  .defaultpage {
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    background-color: #f4f4f4;

    .container {
      padding: 500px 0;
      width: 248px;
      height: 248px;
      margin: 0 auto;

      .img {
        width: 100%;
        height: 100%;
      }

      .txt {
        color: #7f7f7f;
      }
    }

    .addBtn {
      position: fixed;
      left: 0;
      bottom: 30px;
      margin: 0 30px;
      width: 690px;
      height: 96px;
      font-size: 28px;
      color: #dd1a21;
      border: 1px solid #dd1a21;
      background-color: #f4f4f4;
      border-radius: 4px;
    }

    .listContainer {
      box-sizing: border-box;
      margin: 0;
      padding: 88px 0 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;

      .img {
        width: 750px;
        height: 10px;
        background: url(http://yanxuan-static.nosdn.127.net/hxm/yanxuan-wap/p/20161201/style/img/icon-normal/address-bg-67880192dc.png?imageView&type=webp)
          repeat-x;
        background-size: 60px 10px;
      }
    }
  }

  .addrespage {
    .addresFrom {
      position: relative;
      padding-top: 88px;
      // height: ceil(1334 - 88px);
      border-top: 1px solid #d9d9d9;
      color: #999999;
      background-color: #ffffff;

      .row {
        margin-left: 30px;
        box-sizing: border-box;
        padding: 30px 0;
        height: 96px;
        border-bottom: 1px solid #d9d9d9;

        input {
          width: 100%;
          font-size: 28px;
          border: none;
          outline: none;
          background-color: #ffffff;
        }

        input::placeholder {
          color: #999999;
        }
      }

      .row1 {
        padding: 36px 0;
      }

      .row2 {
        border-bottom: none;
      }

      .chkbox {
        box-sizing: border-box;
        height: 94px;
        line-height: 94px;
        text-align: center;
        border-top: 1px solid #d9d9d9;
        border-bottom: 1px solid #d9d9d9;
        background-color: #fafafa;

        .checkbox {
          display: inline-block;
          width: 38px;
          height: 38px;
          background: url(../../assets/icons/1d547ff8-3988-4bbf-acc4-d58485740435.png);
          background-position: 0 -184px;
          background-size: 38px 526px;
          vertical-align: text-top;
        }
        .checked {
          background-position: 0 -232px;
        }

        span {
          margin-left: 20px;
          font-size: 28px;
          color: #333333;
        }
      }
    }

    .btnContainer {
      position: fixed;
      display: flex;
      width: 100%;
      height: 96px;
      line-height: 96px;
      bottom: 0;
      left: 0;

      .addressBtn {
        display: inline-block;
        width: 50%;
        text-align: center;
      }

      .addressBtn1 {
        background-color: #ffffff;
        color: #333333;
        font-size: 28px;
      }

      .addressBtn2 {
        background-color: #dd1a21;
        color: #ffffff;
        font-size: 28px;
      }
    }
  }

  ::v-deep .el-drawer__wrapper {
    background-color: rgba(0, 0, 0, 0.4);

    .el-tabs__nav-scroll {
      padding-left: 20px;
    }
    .el-drawer__body,
    .el-tabs,
    .el-tabs__content,
    .el-tab-pane {
      height: 100%;
    }

    .el-tabs__item {
      max-width: 72px;
      padding: 0 10px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .el-tabs__item.is-active {
      color: #dd1a21;
    }
    .el-tabs__active-bar {
      background-color: #dd1a21;
    }

    .itemList {
      height: 100%;
      padding-left: 20px;
      overflow: scroll;

      .item {
        height: 52px;
        line-height: 52px;
        font-size: 14px;
      }
      .item.active {
        color: #dd1a21;
      }
    }

    .btn {
      position: absolute;
      top: 10px;
      right: 20px;
      font-size: 14px;
      border: none;
      background-color: #fff;
      outline: none;
      color: #333333;
    }
  }
}
</style>