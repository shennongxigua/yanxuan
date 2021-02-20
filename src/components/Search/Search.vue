<template>
  <div class="searchWrapper">
    <div class="searchContent">
      <div class="hd">
        <div class="inputWrapper">
          <i class="iconfont icon-sousuo"></i>
          <el-input
            class="searchInput"
            size="mini"
            v-model="keyword"
            placeholder="请输入商品名称"
            clearable
            @input="handleInputChange"
          ></el-input>
        </div>
        <div class="cancelBtn" @click="goBack">取消</div>
      </div>
      <div class="searchSuggestionsViews">
        <div class="searchSuggestionsContent" v-if="!keyword">
          <h3 class="title">热门搜索</h3>
          <div class="list">
            <span
              v-for="(item,index) in hotKeywordVOList"
              :key="index"
              :class="['item',item.algSort ? 'highlight': '']"
            >{{item.keyword}}</span>
          </div>
        </div>
        <div class="searchAutocomplete" v-else>
          <ul class="list" v-for="(item,index) in searchAutoCompleteDataList" :key="index">
            <li class="item">
              {{item}}
              <i class="iconfont icon-arrow-right"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      keyword: "",
      hotKeywordVOList: [], // 推荐搜索
      searchAutoCompleteDataList: [] // 搜索自动完成后的数据
    };
  },
  methods: {
    async init() {
      let result = await axios.post("/api/xhr/search/init.json");
      console.log(result);

      this.hotKeywordVOList = result.data.data.hotKeywordVOList;
    },
    // 获取搜索自动完成后的数据
    async getSearchAutoCompleteData() {
      /* 官方接口需要发送FromData格式的post请求 */
      let result = await axios({
        url: "/api/xhr/search/searchAutoComplete.json", //请求路径（接口）
        method: "POST", //请求方式
        // headers: { "content-type": "application/x-www-form-urlencoded" }, // 请求头，发送FormData格式的数据，必须是 这种请求头。
        data: qs.stringify({ keywordPrefix: this.keyword }) //发送请求要传的FormData参数。必须用 qs.stringify（）序列化一下。
      });

      console.log(result.data);

      this.searchAutoCompleteDataList = result.data.data;
    },
    handleInputChange() {
      this.getSearchAutoCompleteData();
    },
    // 回退
    goBack(){
      this.$router.go(-1);
    }
  },
  created() {
    this.init();
  }
};
</script>

<style lang="less" scoped>
.searchWrapper {
  position: relative;
  height: 100%;
  background-color: #eeeeee;
  z-index: 1;

  .searchContent {
    background-color: #ffffff;
    .hd {
      display: flex;
      align-items: center;
      padding: 0 20px;
      height: 88px;

      .inputWrapper {
        display: flex;
        align-items: center;
        padding: 0 20px;
        margin: 0 10px;
        width: 580px;
        height: 56px;
        border-radius: 10px;
        background-color: #eeeeee;

        .iconfont {
          margin-right: 16px;
          font-size: 32px;
          column-rule-color: #999999;
        }

        .searchInput {
          // line-height: 48px;
          ::v-deep .el-input__inner {
            border: none;
            outline: none;
            padding: 0;
            height: 48px;
            font-size: 26px;
            background-color: #eeeeee;
          }
        }

        ::-webkit-input-placeholder {
          color: #999999;
        }
      }

      .cancelBtn {
        padding-left: 10px;
        font-size: 28px;
        color: #333333;
      }
    }
  }

  .searchSuggestionsViews {
    padding: 0 0 30px 30px;

    .searchSuggestionsContent {
      .title {
        height: 90px;
        line-height: 90px;
        font-weight: 500;
        font-size: 28px;
        color: #999999;
      }

      .list {
        .item {
          display: inline-block;
          margin: 0 32px 32px 0;
          padding: 0 15px;
          height: 45px;
          line-height: 45px;
          color: #333333;
          border: 1px solid #999999;
          border-radius: 6px;
        }

        .highlight {
          color: #dd1a21;
          border: 1px solid #dd1a21;
        }
      }
    }

    .searchAutocomplete {
      .list {
        padding-left: 15px;

        .item {
          position: relative;
          box-sizing: border-box;
          margin-top: 10px;
          height: 90x;
          line-height: 90px;
          font-size: 28px;
          color: #777777;
          border-bottom: 1px solid #ececec;

          .iconfont {
            position: absolute;
            top: 50%;
            right: 20px;
            font-size: 32px;
            transform: translateY(-50%);
          }
        }
      }
    }
  }
}
</style>