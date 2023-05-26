<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-card class="mx-auto" max-width="300" tile>
        <v-list dense>
          <!-- 메뉴 바 -->
          <v-subheader>MENU</v-subheader>
          <v-list-item exact v-for="(item, i) in menuItems" :key="i" router :to="{ name: item.router }">
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar color="indigo" dark fixed app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <div style="font-size:large">ALLIN</div>

      <v-spacer></v-spacer>
      <div v-if="isLogin">{{ userInfo.name }}</div>
      <v-btn v-else elevation="0" color="rgba(0,0,0,0)" router :to="{ name: 'login' }">
        <v-icon small>mdi-login</v-icon>Login
      </v-btn>

      <!-- 로그인 후 기능 창 -->
      <v-menu v-if="isLogin" dense offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="ma-3" icon small v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>

          <!-- 마이 프로젝트 버튼 -->
          <v-list-item exact @click="getUserNo">
            <v-list-item-action>
              <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>마이 프로젝트</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- 로그아웃 버튼 -->
          <v-list-item exact @click="logout">
            <v-list-item-action>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>로그아웃</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-menu>

      <!-- 마이 프로젝트 다이어로그 창 -->
      <v-dialog v-model="dialogTodolist" persistent max-width="400px">
        <MyProject :userProject="userProject" @close="dialogTodolist = false" />
      </v-dialog>

    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2023</span>
    </v-footer>
  </v-app>
</template>

<script>
import MyProject from './components/MyProject.vue'
import { mapState, mapActions } from 'vuex'

import axios from "axios";

export default {
  data: () => ({
    drawer: null,             // 사이드 메뉴 관리
    dialogTodolist: false,    // todolist창 관리
    userProject: [],          // 로그인 한 유저가 참여하는 프로젝트 저장
  }),
  components: {
    MyProject
  },
  computed: {
    ...mapState(["menuItems", "isLogin", "userInfo"])
  },
  methods: {
    ...mapActions(['logout']),
    getUserNo() {
      console.log("유저 번호 : ", this.userInfo.userNo);
      this.dialogTodolist = true;
      axios.post('/api/my_project', { user_no: this.userInfo.userNo })
        .then(res => {
          this.userProject = res.data.projects;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
}
</script>