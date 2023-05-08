<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
    >
      <v-card
        class="mx-auto"
        max-width="300"
        tile
      >
        <v-list dense>
          <v-subheader>MENU</v-subheader>

          <v-list-item 
            exact
            v-for="(item, i) in items"
            :key="i"
            router :to="{name: item.router}" 
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- <v-list-item router :to="{name: 'dashboard'}" exact>
            <v-list-item-action>
              <v-icon>mdi-view-dashboard-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>대시보드</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item router :to="{name: 'project'}" exact>
            <v-list-item-action>
              <v-icon>mdi-bulletin-board</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>프로젝트</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          
          <v-list-item router :to="{name: 'outputStatus'}" exact>
            <v-list-item-action>
              <v-icon>mdi-clipboard-search-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>산출물현황</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item router :to="{name: 'useLog'}" exact>
            <v-list-item-action>
              <v-icon>mdi-clipboard-text-clock-outline</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>사용로그</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item router :to="{name: 'login'}" exact>
            <v-list-item-action>
              <v-icon small>mdi-login</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Login</v-list-item-title>
            </v-list-item-content>
          </v-list-item> -->

        </v-list>
      </v-card>
    </v-navigation-drawer>

    <v-app-bar color="indigo" dark fixed app>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-app-bar-title>Application</v-app-bar-title>
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
export default {
  data: () => ({
    drawer: null,
    items: [
      { text: '대시보드', icon: 'mdi-view-dashboard-outline', router: 'dashboard' },
      { text: '프로젝트', icon: 'mdi-bulletin-board', router: 'project' },
      { text: '산출물현황', icon: 'mdi-clipboard-search-outline', router: 'outputStatus' },
      { text: '사용로그', icon: 'mdi-clipboard-text-clock-outline', router: 'useLog' },
      { text: '환경설정', icon: 'mdi-cog-outline', router: 'setting' },
      { text: '로그인', icon: 'mdi-login', router: 'login' },
    ],
  }),
  props: {
    source: String
  },
  methods:{
  }
}
</script>