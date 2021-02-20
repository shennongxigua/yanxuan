import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 引入初始化样式文件
import './assets/css/normalize.css'
import './assets/css/base.css'
// 引入字体图标
import './assets/iconfont/iconfont.css'
// 引入时间格式化库
import moment from 'moment'

import VueAwesomeSwiper  from 'vue-awesome-swiper'
import 'swiper/css/swiper.css' 

Vue.use(VueAwesomeSwiper)

// 全局过滤器时间戳
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD') {
  if (dataStr) {
    return moment(dataStr).format(pattern)
  } else {
    return dataStr
  }
});


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
