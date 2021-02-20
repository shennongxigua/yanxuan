<template>
  <div class="listWrapper" v-if="data.cartGroupList">
    <div class="item" v-for="(item,index) in data.cartGroupList[1].cartItemList" :key="index">
      <!-- 多选按钮 -->
      <div :class="['checkboxImg',item. checked && 'checked']" @click="toggleHandle(item.uniqueKey)"></div>
      <div class="cartGood">
        <div class="imgwrapper">
          <img class="img" :src="item.pic+'?type=webp&imageView&thumbnail=160x0&quality=75'" alt="">
        </div>
        <div class="content">
          <div class="line1">
            <div class="name">{{item.itemName}}</div>
          </div>
          <div class="line2">
            <div class="spec">
              <div class="specText">
                {{item.specList[0].specValue}}
              </div>
              <div class="specIcon">
                <i class="iconfont icon-arrow-right"></i>
              </div>
            </div>
          </div>
          <div class="line3">
            <div class="price">
              ￥{{item.actualPrice}}
            </div>
          </div>
          <div class="selnum">
            <div class="less" @click="less(item.uniqueKey,item.cnt)">-</div>
            <div class="textWrpper">
              <input class="num" type="number" v-model="item.cnt" @change="edit(item.uniqueKey,item.cnt)">
            </div>
            <div class="more" @click="more(item.uniqueKey)">+</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["listData"],
  data() {
    return {
      data: {},
    };
  },
  methods: {
    // 是否选中商品的回调
    toggleHandle(keyId) {
      // 将值传给组件
      this.$emit("toggle", keyId);
    },
    // 增加触发的回调
    more(keyId) {
      // 将值传给组件
      this.$emit("more", keyId);
    },
    // 减少触发的回调
    less(keyId, val) {
      if (val == 1) {
        this.$emit("remove", keyId);
        return;
      }
      // 将值传给组件
      this.$emit("less", keyId);
    },
    // 编辑数量的回调
    edit(keyId, val) {
      this.$emit("deit", keyId, val);
    },
    // 删除触发的回调
    remove(keyId) {
      this.$emit("remove", keyId);
    },
  },
  watch: {
    listData() {
      this.data = this.listData;
    },
  },
  created() {
    this.data = this.listData;
  },
};
</script>

<style lang="less" scoped>
.listWrapper {
  .item {
    position: relative;
    margin-top: 20px;
    padding: 20px 0;
    height: 172px;
    background-color: #ffffff;

    .checkboxImg {
      position: absolute;
      top: 50%;
      left: 15px;
      width: 38px;
      height: 38px;
      transform: translateY(-50%);
      background: url(../../assets/icons/1d547ff8-3988-4bbf-acc4-d58485740435.png);
      background-position: 0 -184px;
      background-size: 38px 526px;
    }

    .checked {
      background-position: 0 -232px;
    }

    .cartGood {
      display: flex;
      margin-left: 80px;

      .imgwrapper {
        background-color: #eeeeee;
        width: 86px;
        height: 86px;
        border-radius: 6px;
        overflow: hidden;

        .img {
          width: 100%;
          height: 100%;
        }
      }

      .content {
        position: relative;
        display: flex;
        flex: 1;
        flex-wrap: wrap;
        padding: 0 40px 0 20px;
        align-content: flex-start;

        .line1 {
          width: 100%;
          font-size: 28px;
          color: #333333;

          .name {
            font-size: 28px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }
        .line2 {
          margin-top: 10px;
          width: 100%;
          color: #7f7f7f;

          .spec {
            display: inline-block;
            padding: 0 6px;
            border: 1px solid #efefef;
            border-radius: 4px;
            background-color: #fafafa;

            .specText {
              max-width: 300px;
              display: inline-block;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }

            .specIcon {
              display: inline-block;
              transform: rotate(90deg);
            }
          }
        }
        .line3 {
          position: absolute;
          bottom: 10px;

          .price {
            font-size: 28px;
          }
        }
        .selnum {
          position: absolute;
          bottom: 10px;
          right: 10px;
          text-align: center;
          line-height: 52px;
          font-size: 28px;
          color: #666666;

          .less {
            display: inline-block;
            box-sizing: border-box;
            width: 58px;
            height: 52px;
            border: 1px solid #cccccc;
          }
          .more {
            display: inline-block;
            box-sizing: border-box;
            width: 58px;
            border: 1px solid #cccccc;
            height: 52px;
          }
          .textWrpper {
            display: inline-block;
            box-sizing: border-box;
            border-top: 1px solid #cccccc;
            border-bottom: 1px solid #cccccc;
            width: 58px;
            height: 52px;
            .num {
              box-sizing: border-box;
              width: 54px;
              height: 48px;
              text-align: center;
              outline: none;
              border: none;
            }
          }
        }
      }
    }
  }
}
</style>