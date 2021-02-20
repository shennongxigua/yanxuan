import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home/Home.vue'
import Login from '../components/Login/Login.vue'
import Person from '../components/Person/Person.vue'
import DiscountCoupon from '../components/Person/DiscountCoupon.vue'
import RedPacket from '../components/Person/RedPacket.vue'
import CateList from '../components/CateList/CateList.vue'
import Search from '../components/Search/Search.vue'
import BargainBuy from '../components/BargainBuy/BargainBuy.vue'
import Cart from '../components/cart/Cart.vue'
import Address from '../components/Address/Address.vue'

Vue.use(VueRouter)

const routes = [

  { path: '/', redirect: '/home' },
  // { path: '/', component: BargainBuy },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/person', component: Person },
  { path: '/discount', component: DiscountCoupon },
  { path: '/redPacket', component: RedPacket },
  { path: '/cateList', component: CateList },
  { path: '/search', component: Search },
  { path: '/bargainBuy', component: BargainBuy },
  { path: '/cart', component: Cart },
  { path: '/address', component: Address },


]

const router = new VueRouter({
  routes
})

export default router
