import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router/index"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    allUsers: [  // Data Base
      { id: 1, name: 'hoza', email: 'ndsld99@naver.com', password: '1234' },
      { id: 2, name: 'aaza', email: 'ndsld33@naver.com', password: '1234' },
    ],
    menuItems: [
      { text: '대시보드', icon: 'mdi-view-dashboard-outline', router: 'dashboard' },
      { text: '프로젝트', icon: 'mdi-bulletin-board', router: 'project' },
      { text: '산출물현황', icon: 'mdi-clipboard-search-outline', router: 'outputStatus' },
      { text: '사용로그', icon: 'mdi-clipboard-text-clock-outline', router: 'useLog' },
      { text: '환경설정', icon: 'mdi-cog-outline', router: 'setting' },
    ],
    summery: [
      { text: '완료', type: 'success', data: 3 },
      { text: '진행', type: 'info', data: 3 },
      { text: '취소', type: 'warning', data: 1 },
      { text: '지연', type: 'error', data: 1 },
    ],
    headers: [
      { text: '프로젝트명', value: 'name', align: 'start', sortable: false },
      { text: '담당자', value: 'person' },
      { text: '상태', value: 'state' },
      { text: '진행률', value: 'progress' },
      { text: '시작일', value: 'start' },
      { text: '완료예정일', value: 'end' },
    ],
    projects: [ // Data Base
      { name: 'Frozen Yogurt', person: 159, state: 6.0, progress: 24, start: 4.0, end: 1, },
      { name: 'Ice cream sandwich', person: 237, state: 9.0, progress: 37, start: 4.3, end: 1, },
      { name: 'Eclair', person: 262, state: 16.0, progress: 23, start: 6.0, end: 7, },
      { name: 'Cupcake', person: 305, state: 3.7, progress: 67, start: 4.3, end: 8, },
      { name: 'Gingerbread', person: 356, state: 16.0, progress: 49, start: 3.9, end: 16, },
      { name: 'Jelly bean', person: 375, state: 0.0, progress: 94, start: 0.0, end: 0, },
      { name: 'Lollipop', person: 392, state: 0.2, progress: 98, start: 0, end: 2, },
      { name: 'Honeycomb', person: 408, state: 3.2, progress: 87, start: 6.5, end: 45, },
      { name: 'Donut', person: 452, state: 25.0, progress: 51, start: 4.9, end: 22, },
      { name: 'KitKat', person: 518, state: 26.0, progress: 65, start: 7, end: 6, },
    ],
  },
  getters: {
  },
  mutations: {  // 상태값 변화
    // 로그인이 성공했을 때
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
    },
    // 로그인이 실패했을 때
    loginError(state) {
      state.isLogin = false
      state.isLoginError = true
    },
    logout(state){
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    },
  },
  actions: {
    // 로그인 시도
    login({ state, commit }, loginObj) {
      let selectedUser = null
      state.allUsers.forEach(user => {
        if (user.email === loginObj.email) selectedUser = user
      })
      if(selectedUser === null || selectedUser.password !== loginObj.password) commit('loginError')
      else {
        commit('loginSuccess', selectedUser)
        router.push({name:"dashboard"})
      }
    },
    logout({commit}){
      commit("logout")
      router.push({name: "login"})
    }
  },
  modules: {
  }
})
