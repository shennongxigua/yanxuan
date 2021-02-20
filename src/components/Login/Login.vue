<template>
  <div>
    <!-- 头部 -->
    <top-nav-logo></top-nav-logo>
    <!-- 登录部分 -->
    <div class="loginWarper">
      <!-- 登录表单 -->
      <el-form :class="currentTabComponent !== '' ? 'login-form' : 'loginTypes'">
        <!-- 选择登录方式区域 -->
        <div v-if="currentTabComponent === ''" class="typeWarper">
          <img class="logo" src="../../assets/images/39c5e4583753d4c3cb868a64c2c109ea.png" />
          <div class="btns">
            <el-button class="typePhoneBtn" @click="setLoginType('phoneVerCodeLogin')"><i class="iconfont icon-shouji"></i>手机号快捷登录</el-button>
            <el-button class="typeEmailBtn" @click="setLoginType('emailLogin')"><i class="iconfont icon-email"></i>邮箱密码登录</el-button>
          </div>
          <div class="thirdPartyLogin">
            <div class="thirdPartyLogin-item">
              <i class="iconfont icon-weixin"></i>
              <span>微信</span>
            </div>
            <div class="thirdPartyLogin-item">
              <i class="iconfont icon-QQ"></i>
              <span> QQ</span>
            </div>
            <div class="thirdPartyLogin-item">
              <i class="iconfont icon-tubiaozhizuo-"></i>
              <span> 微博</span>
            </div>
          </div>
        </div>

        <!-- 手机号验证码模式 start -->
        <div v-else-if="currentTabComponent === 'phoneVerCodeLogin'">
          <!-- logn -->
          <div class="logo">
            <img src="../../assets/images/39c5e4583753d4c3cb868a64c2c109ea.png" />
          </div>

          <el-form-item class="row">
            <el-input id="login-form-input-phone" placeholder="请输入手机号" v-model="loginPhone" clearable @focus="clearFerromsg" @blur="loginFormPhoneRules"></el-input>
          </el-form-item>
          <el-form-item class="row">
            <el-input id="login-form-input-verCode" placeholder="请输入短信验证码" v-model="verificationCode" @focus="clearFerromsg"></el-input>
            <el-button id="getVerBtn">获取验证码</el-button>
          </el-form-item>
          <div id="nerror">
            <div class="ferrorhead" v-if="ferrormsg !== ''">
              {{ ferrormsg }}
            </div>
          </div>
          <div class="login-form-footer">
            <router-link class="help" to>遇到问题?</router-link>
            <div class="right">
              <a href="#" @click="setLoginType('phonePwdLogin')">使用密码验证登录</a>
            </div>
          </div>
          <!-- 登录按钮区域  -->
          <div class="un-login">
            <el-button id="loginBtn" @click="loginForm">登录</el-button>
            <label class="service">
              <el-checkbox v-model="agreeService"></el-checkbox>
              <!-- <input type="checkbox" :checked="agreeService" /> -->
              <span>我同意</span>
              <a href="#">《服务条款》</a>
              和
              <a href="#">《网易隐私政策》</a>
            </label>
            <div class="othersLoginBtn">
              <a href="#" @click="setLoginType('')">
                其他的登录方式
                <i></i>
              </a>
            </div>
          </div>
        </div>
        <!-- 手机号验证码模式 end -->

        <!-- 账号密码登录模式 start -->
        <div v-else-if="currentTabComponent === 'phonePwdLogin'">
          <!-- logn -->
          <div class="logo">
            <img src="../../assets/images/39c5e4583753d4c3cb868a64c2c109ea.png" />
          </div>

          <el-form-item class="row mt-30">
            <el-input id="login-form-input-account" placeholder="请输入账号" v-model="loginPhone" clearable @focus="clearFerromsg" @blur="loginFormPhoneRules"></el-input>
          </el-form-item>
          <el-form-item class="row">
            <el-input id="login-form-input-pwd" placeholder="请输入密码" type="password" v-model="loginPwd" @focus="clearFerromsg"></el-input>
          </el-form-item>
          <div id="nerror">
            <div class="ferrorhead" v-if="ferrormsg !== ''">
              {{ ferrormsg }}
            </div>
          </div>
          <div class="login-form-footer">
            <router-link class="help" to>忘记密码</router-link>
            <div class="right">
              <a href="#" @click="setLoginType('phoneVerCodeLogin')">短信快捷登录</a>
            </div>
          </div>

          <!-- 登录按钮区域 -->
          <div class="un-login">
            <el-button id="loginBtn" @click="loginForm">登录</el-button>
            <div class="othersLoginBtn">
              <a href="#" @click="setLoginType('')">
                其他的登录方式
                <i></i>
              </a>
            </div>
          </div>
        </div>
        <!-- 账号密码登录表单 end -->

        <!-- 邮箱密码登录表单 start -->
        <div v-else-if="currentTabComponent === 'emailLogin'">
          <!-- logn -->
          <div class="logo">
            <img src="../../assets/images/39c5e4583753d4c3cb868a64c2c109ea.png" />
          </div>

          <el-form-item class="row mt-30">
            <el-input id="login-form-input-email" placeholder="请输入邮箱" v-model="loginEmail" clearable @focus="clearFerromsg" @blur="loginFormPhoneRules"></el-input>
          </el-form-item>
          <el-form-item class="row">
            <el-input id="login-form-input-pwd" placeholder="请输入密码" v-model="loginPwd" @focus="clearFerromsg"></el-input>
          </el-form-item>
          <div id="nerror">
            <div class="ferrorhead" v-if="ferrormsg !== ''">
              {{ ferrormsg }}
            </div>
          </div>
          <div class="login-form-footer">
            <router-link class="help" to>注册账号</router-link>
            <div class="right">
              <a href="#" @click="setLoginType('phoneVerCodeLogin')">忘记密码</a>
            </div>
          </div>

          <!-- 登录按钮区域 -->
          <div class="un-login">
            <el-button id="loginBtn" @click="loginForm">登录</el-button>

            <div class="othersLoginBtn">
              <a href="#" @click="setLoginType('')">
                其他的登录方式
                <i></i>
              </a>
            </div>
          </div>
        </div>
        <!-- 邮箱密码登录表单 end -->
      </el-form>
    </div>
  </div>
</template>

<script>
import TopNavLogo from '../TopNavLogo/TopNavLogo.vue'
// 手机号正则表达式
const reg_tel = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/;
// 电子邮箱正则表达式
const reg_email = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;

export default {
  data() {
    return {
      loginPhone: "", // 登录表单手机号
      verificationCode: "", // 登录表单验证码
      loginEmail: "", // 登录表单邮箱
      loginPwd: "", // 登录表单密码
      ferrormsg: "", // 验证消息提示  --->  ["手机号不能为空","手机号格式不正确","请输入短信验证码","验证码不正确"]
      agreeService: true, // 是否同意服务
      currentTabComponent: "", // 登录的模板 --->  ['phoneVerCodeLogin','phonePwdLogin','emailLogin']
    };
  },
  methods: {
    // 设置登录模式
    setLoginType(val) {
      // 清空验证消息提示
      this.ferrormsg = "";
      this.currentTabComponent = val;
    },
    // 设置前端验证提示信息
    setFerrormsg(val) {
      this.ferrormsg = val;
    },
    // 清空验证提示信息
    clearFerromsg() {
      this.ferrormsg = "";
    },
    // 手机号验证码登录验证
    loginFormPhoneRules() {
      if (this.loginPhone.trim() === "") {
        return this.setFerrormsg("手机号不能为空") || false;
      }
      if (!reg_tel.test(this.loginPhone)) {
        return this.setFerrormsg("手机号格式不正确") || false;
      }
      return true;
    },
    // 手机号密码登录验证
    loginFormPhonePwdRules() {
      if (this.loginPhone.trim() === "") {
        return this.setFerrormsg("手机号不能为空") || false;
      }
      if (!reg_tel.test(this.loginPhone)) {
        return this.setFerrormsg("手机号格式不正确") || false;
      }
      if (this.loginPwd === "") {
        return this.setFerrormsg("密码不为空") || false;
      }
      return true;
    },
    // 邮箱密码登录验证
    loginFromEmailRules() {
      if (this.loginEmail.trim === "") {
        return this.setFerrormsg("邮箱不能为空") || false;
      }
      if (!reg_email.test(this.loginEmail)) {
        return this.setFerrormsg("邮箱格式不正确");
      }
      if (this.loginPwd === "") {
        return this.setFerrormsg("密码不为空") || false;
      }
      return true;
    },
    // 提交登录表单
    loginForm() {
      let isFlag;
      // 手机号快捷登录
      if (this.currentTabComponent === "phoneVerCodeLogin") {
        isFlag = this.loginFormPhoneRules();
        if (isFlag) {
          // 手机号合法
          // 判断验证码是否输入
          if (this.verificationCode === "") {
            return this.setFerrormsg("请输入短信验证码");
          }
          // 在这里发起请求 判断验证码
        }
      }
      // 手机号密码登录
      if (this.currentTabComponent === "phonePwdLogin") {
        isFlag = this.loginFormPhonePwdRules();
        if (isFlag) {
          /* 
            密码为admin时 模拟登录成功
          */
          if (this.loginPwd === "admin") {
            localStorage.setItem("xg_token", "sdhoi6541654d4as8721asd");
            this.$router.go(-1)
          } else {
            this.setFerrormsg("密码错误");
          }
        }
      }
      // 邮箱密码登录
      if (this.currentTabComponent === "emailLogin") {
        isFlag = this.loginFromEmailRules();
        if (isFlag) {
          // 邮箱合法
          // 在这里发起请求
        }
      }
    },
  },
  components: {
    TopNavLogo
  },
};
</script>

<style lang="less" scoped>
.mt-30 {
  margin-top: 60px;
}

.loginWarper {
  position: relative;
  z-index: 999;
  height: 100vh;
  background-color: #f2f5f4;

  .loginTypes {
    width: 100%;
    height: ceil(1334px - 88px);
  }

  .typeWarper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 160px;

    img {
      width: 268px;
      height: 90px;
    }

    .btns {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 200px;

      button {
        box-sizing: border-box;
        margin: 0 0 60px 0;
        padding: 0;
        width: 670px;
        height: 94px;
        line-height: 94px;
        font-size: 28px;
        color: #ffffff;
        background-color: #dd1a21;
        border: 1px solid #dd1a21;
        border-radius: 3px;
        i {
          margin-right: 10px;
          font-size: 30px;
        }
      }

      .typeEmailBtn {
        margin: 0;
        color: #dd1a21;
        background-color: #ffffff;
      }
    }

    .thirdPartyLogin {
      position: absolute;
      left: 0;
      bottom: 80px;
      display: flex;
      justify-content: center;
      width: 100%;

      .thirdPartyLogin-item {
        padding: 0 40px;
        height: 40px;
        line-height: 40px;
        color: #979797;
        border-right: 1px solid #979797;

        .iconfont {
          font-size: 38px;
          color: #979797;
        }

        span {
          margin-left: 2px;
          font-size: 26px;
        }
      }
      .thirdPartyLogin-item:nth-last-child(1) {
        border-right: none;
      }
    }
  }

  .login-form {
    padding: 60px 40px 0;
    height: 516px;

    .logo {
      margin-top: 56px;
      width: 100%;
      height: 90px;
      text-align: center;

      img {
        width: 268px;
        height: 90px;
      }
    }

    .row {
      position: relative;
      border-bottom: 1px solid #f5f5f5;

      ::v-deep [id^="login-form-input"] {
        margin: 28px 0;
        padding-left: 0;
        height: 44px;
        background-color: #f2f5f4;
        border: none;
      }

      ::v-deep #getVerBtn {
        position: absolute;
        top: 50%;
        right: 10px;
        padding: 10px;
        color: #333333;
        background-color: #ffffff;
        border-color: #333333;
        border-radius: 4px;
        transform: translateY(-50%);
      }
    }
    #nerror {
      margin: 5px 0;
      color: #dd1a21;
    }

    .login-form-footer {
      margin: 20px 0;
      font-size: 28px;

      .help {
        color: #7f7f7f;
      }

      .right {
        float: right;
        a {
          font-size: 28px;
        }
      }
    }

    .un-login {
      padding-top: 40px;

      ::v-deep #loginBtn {
        margin: 20px 0;
        padding: 0;
        width: 100%;
        height: 90px;
        font-size: 28px;
        color: #ffffff;
        background-color: #dd1a21;
      }

      .service {
        // input {
        //   width: 28px;
        //   height: 28px;
        //   border: 2px solid #c3c3c3;
        // }

        span {
          margin-left: 30px;
          color: #7f7f7f;
        }

        a {
          color: #007aff;
        }
      }

      .othersLoginBtn {
        margin-top: 46px;

        text-align: center;
        a {
          font-size: 28px;
          color: #333333;
        }

        a i {
          display: inline-block;
          width: 14px;
        }

        a i::after {
          content: "";
          display: block;
          width: 14px;
          height: 14px;
          border: 2px solid transparent;
          border-top-color: #333333;
          border-right-color: #333333;
          transform: rotate(45deg);
        }
      }
    }
  }
}
</style>