<template>
  <div v-if="true">
    <ul>
      <li
        class="item"
        v-for="(item, index) in data"
        :key="index"
        @click="editInfo(item.id)"
      >
        <div class="left">
          <p class="uname">{{ item.name }}</p>
          <span class="default" v-if="item.dft">默认</span>
        </div>
        <div class="middle">
          <div class="con">
            <div class="utel">{{ item.mobile }}</div>
            <div class="uinfo">{{ item.fullAddress }}</div>
          </div>
          <i class="iconfont icon-shanchu" @click.stop="remove(item.id)"></i>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  props: ["addlist"],
  data() {
    return {
      data: [],
    };
  },
  methods: {
    remove(id) {
      this.$emit("remove", id);
    },
    editInfo(id) {
      this.$emit("editinfo", id);
    },
  },
  watch: {
    addlist() {
      this.data = this.addlist;
    },
  },
  created() {
    this.data = this.addlist;
  },
};
</script>

<style lang="less" scoped>
ul {
  padding-left: 30px;
}
.item {
  position: relative;
  box-sizing: border-box;
  float: left;
  display: flex;
  padding: 37px 0;
  width: 100%;
  height: 150px;
  border-bottom: 1px solid #e7e7e7;

  .left {
    width: 120px;
    height: 100%;
    text-align: left;

    .uname {
      margin-bottom: 10px;
      line-height: 40px;
      height: 40px;
      color: #333333;
      font-size: 28px;
    }

    .default {
      padding: 0 6px;
      border: 4px solid #dd1a21;
      border-radius: 6px;
      color: #dd1a21;
    }
  }

  .middle {
    width: 500px;
    text-align: left;

    .con {
      display: flex;
      height: 100%;
      flex-direction: column;
      justify-content: space-around;

      .utel {
        font-size: 28px;
        color: #333333;
      }
      .uinfo {
        color: #666666;
      }
    }

    i.iconfont {
      position: absolute;
      top: 50%;
      right: 20px;
      font-size: 42px;
      color: #666666;
      transform: translateY(-50%);
    }
  }
}
</style>