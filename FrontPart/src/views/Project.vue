<template>
  <v-card>
    <v-layout>
      <v-app-bar flat density="compact">
        <v-app-bar-title>프로젝트 리스트</v-app-bar-title>
      </v-app-bar>
    </v-layout>
    <v-row class="ml-2">
      <v-col>
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

      <v-col>
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
      <v-col>
        <v-autocomplete label="상태" :items="['완료', '진행중', '미착수', '지연', '취소']"></v-autocomplete>
      </v-col>
      <v-col>
        <v-text-field label="프로젝트명" required></v-text-field>
      </v-col>

      <v-col class="mt-5">
        <v-dialog
          scrollable
          width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2" icon outlined small color="primary" v-bind="attrs"
              v-on="on"><v-icon>mdi-shape-rectangle-plus</v-icon>
            </v-btn>
          </template>
          <AddProject />
        </v-dialog>
        <v-btn icon outlined small color="success"><v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-data-table 
    :headers="headers" 
    :items="getData.projects"  
    :footer-props="{
      'items-per-page-text': '페이지 당',
      'items-per-page-options': [5, 10, 15, 20],
      'show-current-page': true,
    }" 
    class="elevation-0"
    ></v-data-table>
  </v-card>
</template>


<script>
import AddProject from '../components/AddProject.vue'
import { mapState } from 'vuex'
import axios from "axios";
import { reactive } from "vue";

export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      s_date: new Date().toISOString().substr(0, 10),
      e_date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
    }
  },
  components:{
    AddProject
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
    },
    refresh(){
      console.log(this.getProjectList())
    },
  },
  computed: {
    ...mapState(["headers"])
  },
  setup(){
    const getData = reactive({
      projects: [],
      users: [],
    });
    axios.get("/api/project").then((res) => {
      getData.projects = res.data.projects;
    });
    axios.get("/api/user").then((res) => {
      getData.users = res.data.users;
    })
    return {
      getData,
    }
  },
}
</script>