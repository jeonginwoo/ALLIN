import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

import Dashboard from '../views/Dashboard.vue'
import Project from '../views/Project.vue'
import OutputStatus from '../views/OutputStatus.vue'
import UseLog from '../views/UseLog.vue'
import Setting from '../views/Setting.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const onlyAuthUser = (to, from, next) => {
  if(store.state.isLogin === false){
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
    component: Dashboard,
    beforeEnter: onlyAuthUser,
  },
  {
    path: '/project',
    name: 'project',
    component: Project,
    beforeEnter: onlyAuthUser,
  },
  {
    path: '/outputStatus',
    name: 'outputStatus',
    component: OutputStatus,
    beforeEnter: onlyAuthUser,
  },
  {
    path: '/useLog',
    name: 'useLog',
    component: UseLog,
    beforeEnter: onlyAuthUser,
  },
  {
    path: '/setting',
    name: 'setting',
    component: Setting,
    beforeEnter: onlyAuthUser,
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
