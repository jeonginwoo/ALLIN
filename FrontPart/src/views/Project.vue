<template>
  <v-card>
    <v-layout>
      <v-app-bar flat density="compact">
        <v-app-bar-title>프로젝트 리스트</v-app-bar-title>
      </v-app-bar>
    </v-layout>
    <v-row>
      <v-col cols="12" lg="2">
        <v-menu ref="menu1" v-model="menu1" :close-on-content-click="false" :return-value.sync="s_date"
          transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="s_date" label="시작일" prepend-icon="mdi-calendar" readonly v-bind="attrs"
              v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="s_date" no-title scrollable :max="e_date">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="s_date_search(s_date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <v-col cols="12" lg="2">
        <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false" :return-value.sync="e_date"
          transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="e_date" label="완료예정일" prepend-icon="mdi-calendar" readonly v-bind="attrs"
              v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="e_date" no-title scrollable :min="s_date">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
            <v-btn text color="primary" @click="e_date_search(e_date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" lg="2">
        <v-autocomplete label="상태" :items="['완료', '진행중', '미착수', '지연', '취소']"></v-autocomplete>
      </v-col>
      <v-col cols="12" lg="3">
        <v-text-field label="프로젝
              트명" required></v-text-field>
      </v-col>
      <v-btn>
        <v-icon large color="orange darken-2">
          mdi-arrow-up-bold-box-outline
        </v-icon>
      </v-btn>
      <v-btn>
        <v-icon large color="orange darken-2">
          mdi-arrow-up-bold-box-outline
        </v-icon>
      </v-btn>
    </v-row>
    <v-data-table :headers="headers" :items="projects" hide-default-footer class="elevation-0"></v-data-table>
  </v-card>
</template>


<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      s_date: new Date().toISOString().substr(0, 10),
      e_date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false
    }
  },
  methods: {
    s_date_search(v) {
      this.s_date = v;
      this.menu1 = false;
      this.$refs.menu1.save(v);
    },
    e_date_search(v) {
      this.e_date = v;
      this.menu2 = false;
      this.$refs.menu2.save(v);
    }
  },
  computed: {
    ...mapState(["headers", "projects"])
  }
}
</script>