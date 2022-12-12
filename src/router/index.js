import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginPage from '../components/LoginPage.vue'
import ResetPassword from '../components/ResetPassword.vue'
import HeaderPage from '../components/HeaderPage.vue'
import ChangePassword from '../components/ChangePassword.vue'
import HomePage from '../components/HomePage.vue'
import CartPage from '../components/CartPage.vue'
import myorders from '../components/MyOrders.vue'
import EditForm from '../components/EditForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/resetpwd',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/header',
    name: 'HeaderPage',
    component: HeaderPage
  },
  {
    path: '/changepwd',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
 
  {
    path: '/cart',
    name: 'CartPage',
    component: CartPage
  },
  {
    path: '/myorders',
    name: 'myorders',
    component: myorders
  },
  {
    path: '/editform/:email?',
    name: 'EditForm',
    component: EditForm
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
