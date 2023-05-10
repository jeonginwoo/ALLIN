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
      <v-btn v-if="isLogin" elevation="0" color="rgba(0,0,0,0)" @click="logout">Logout<v-icon small>mdi-logout</v-icon></v-btn>
      <v-btn v-else elevation="0" color="rgba(0,0,0,0)" router :to="{name: 'login'}"><v-icon small>mdi-login</v-icon>Login</v-btn>
      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
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
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    drawer: null,
  }),
  computed: {
    ...mapState(["menuItems", "isLogin", "userInfo"])
  },
  methods: {
    ...mapActions(['logout'])
  },
}
</script>