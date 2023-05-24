import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const onlyAuthUser = (to, from, next) => {
  if (store.state.isLogin === false) {
    // alert('로그인이 필요한 기능입니다')
    // next("/login")
    next()
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('@/views/Dashboard.vue'),
    beforeEnter: onlyAuthUser,
  },
  {
    path: '/project',
    name: 'project',
    component: () => import('@/views/Project.vue'),
    beforeEnter: onlyAuthUser,
  },
  {
    path: '/outputStatus',
    name: 'outputStatus',
    component: () => import('@/views/OutputStatus.vue'),
    beforeEnter: onlyAuthUser,
  },
  {
    path: '/useLog',
    name: 'useLog',
    component: () => import('@/views/UseLog.vue'),
    beforeEnter: onlyAuthUser,
  },
  {
    path: '/setting',
    name: 'setting',
    component: () => import('@/views/Setting.vue'),
    beforeEnter: onlyAuthUser,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
