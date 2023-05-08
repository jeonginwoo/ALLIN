import Vue from 'vue'
import VueRouter from 'vue-router'

import Dashboard from '../views/Dashboard.vue'
import Project from '../views/Project.vue'
import OutputStatus from '../views/OutputStatus.vue'
import UseLog from '../views/UseLog.vue'
import Setting from '../views/Setting.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/project',
    name: 'project',
    component: Project
  },
  {
    path: '/outputStatus',
    name: 'outputStatus',
    component: OutputStatus
  },
  {
    path: '/useLog',
    name: 'useLog',
    component: UseLog
  },
  {
    path: '/setting',
    name: 'setting',
    component: UseLog
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
