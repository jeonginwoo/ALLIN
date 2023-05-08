import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [
      { text: '대시보드', icon: 'mdi-view-dashboard-outline', router: 'dashboard' },
      { text: '프로젝트', icon: 'mdi-bulletin-board', router: 'project' },
      { text: '산출물현황', icon: 'mdi-clipboard-search-outline', router: 'outputStatus' },
      { text: '사용로그', icon: 'mdi-clipboard-text-clock-outline', router: 'useLog' },
      { text: '환경설정', icon: 'mdi-cog-outline', router: 'setting' },
      { text: '로그인', icon: 'mdi-login', router: 'login' },
    ],
    summery: [
      { text: '완료', type: 'success', data: 3},
      { text: '진행', type: 'info', data: 3},
      { text: '취소', type: 'warning', data: 1},
      { text: '지연', type: 'error', data: 1},
    ],
    project: [
      { projectname: 'ALLIN', manager:'jeonginwoo', state:'보통', progress:'58%', startDate:'2023-03-15', endDate:'2023-05-24'},
    ]
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
