import Vue from 'vue'
import Vuex from 'vuex'
import router from "../router/index"
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    appBarColor: 'indigo',
    allUsers: [  // Data Base
      { userNo: 1, name: '정인우', email: 'aaa@naver.com', password: '1234' },
      { userNo: 2, name: '조성현', email: 'bbb@naver.com', password: '1234' },
      { userNo: 3, name: '남동균', email: 'ccc@naver.com', password: '1234' },
      { userNo: 4, name: '차상민', email: 'ddd@naver.com', password: '1234' },
      { userNo: 5, name: '윤정빈', email: 'eee@naver.com', password: '1234' },
      { userNo: 6, name: '김성현', email: 'fff@naver.com', password: '1234' },
    ],
    menuItems: [  // 최상단의 메뉴 아이템
      { text: '대시보드', icon: 'mdi-view-dashboard-outline', router: 'dashboard' },
      { text: '프로젝트', icon: 'mdi-bulletin-board', router: 'project' },
      { text: '산출물현황', icon: 'mdi-clipboard-search-outline', router: 'outputStatus' },
      { text: '사용로그', icon: 'mdi-clipboard-text-clock-outline', router: 'useLog' },
      { text: '테마변경', icon: 'mdi-palette-outline', router: 'theme' },
    ],
    summary: [  // Summary.vue에서 사용
      { text: '완료', type: 'success', data: 3 },
      { text: '진행', type: 'info', data: 3 },
      { text: '취소', type: 'warning', data: 1 },
      { text: '지연', type: 'error', data: 1 },
    ],
    headers: [  // Project 출력 부분 헤더
      { text: '번호', value: 'Pno' },
      { text: '프로젝트명', value: 'Pname' },
      { text: '담당자', value: 'user_name' },
      { text: '상태', value: 'state' },
      { text: '시작일', value: 'start_date' },
      { text: '마감일', value: 'deadline' },
      { text: '', value: 'actions' },
    ],
    mypage_headers: [  // Mypage 출력 부분 헤더
      { text: '번호', value: 'Pno' },
      { text: '프로젝트명', value: 'Pname' },
      { text: '상태', value: 'state' },
      { text: 'D-day', value: 'd_day' },
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
    logout(state) {
      state.isLogin = false
      state.isLoginError = false
      state.userInfo = null
    },
    setAppBarColor(state, color) {
      state.appBarColor = color;
    },
  },
  actions: {
    // 로그인 시도
    login({ state, commit }, loginObj) {
      let selectedUser = null
      state.allUsers.forEach(user => {
        if (user.email === loginObj.email) selectedUser = user
      })
      if (selectedUser === null || selectedUser.password !== loginObj.password) commit('loginError')
      else {
        commit('loginSuccess', selectedUser)
        router.push({ name: "dashboard" })
      }
    },
    // 로그아웃
    logout({ commit }) {
      commit("logout")
      router.push({ name: "login" })
    },
  },
  modules: {
  }
})
