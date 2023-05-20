<template>
  <v-card>
    <v-layout>
      <v-app-bar flat density="compact">
        <v-app-bar-title>프로젝트 리스트</v-app-bar-title>
      </v-app-bar>
    </v-layout>
    <v-row class="ml-2">

      <!-- 시작일 검색 부분 -->
      <v-col>
        <v-menu ref="start_date_menu" v-model="start_date_menu" :close-on-content-click="false" :return-value.sync="start_date"
          transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="start_date" label="시작일" prepend-icon="mdi-calendar" readonly v-bind="attrs"
              v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="start_date" no-title scrollable :max="end_date">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="start_date_menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="start_date_search(start_date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <!-- 완료예정일 검색 부분 -->
      <v-col>
        <v-menu ref="end_date_menu" v-model="end_date_menu" :close-on-content-click="false" :return-value.sync="end_date"
          transition="scale-transition" offset-y min-width="290px">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field v-model="end_date" label="완료예정일" prepend-icon="mdi-calendar" readonly v-bind="attrs"
              v-on="on"></v-text-field>
          </template>
          <v-date-picker v-model="end_date" no-title scrollable :min="start_date">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="end_date_menu = false">Cancel</v-btn>
            <v-btn text color="primary" @click="end_date_search(end_date)">OK</v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>

      <!-- 상태 검색 부분 -->
      <v-col>
        <v-autocomplete label="상태" :items="['완료', '진행중', '미착수', '지연', '취소']"></v-autocomplete>
      </v-col>

      <!-- 프로젝트명 검색 부분 -->
      <v-col>
        <v-text-field label="프로젝트명" required></v-text-field>
      </v-col>

      <!-- 프로젝트 추가, 새로고침 버튼 부분 -->
      <v-col class="mt-5">
        <!-- 프로젝트 추가 버튼 -->
        <v-dialog
          scrollable
          width="600px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn class="mr-2" icon outlined small color="primary" v-bind="attrs"
              v-on="on"><v-icon>mdi-shape-rectangle-plus</v-icon>
            </v-btn>
          </template>
          <CreateProject />
        </v-dialog>

        <!-- 새로고침 버튼 -->
        <v-btn icon outlined small color="success"><v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>

    </v-row>

    <!-- 프로젝트 목록 부분 -->
    <!-- <v-data-table 
    :headers="headers" 
    :items="getData.projects"  
    :footer-props="{
      'items-per-page-text': '페이지 당',
      'items-per-page-options': [5, 10, 15, 20],
      'show-current-page': true,
    }" 
    class="elevation-0"
    ></v-data-table> -->
    <v-data-table 
      :headers="headers" 
      :items="getData.projects">

<!-- 상태 색깔 -->
    <template v-slot:item.state="{ item }">
      <v-chip
        :color="getColor(item.state)"
        dark
      >
        {{ item.state }}
      </v-chip>
    </template>

      <template v-slot:item.actions="{ item }">

        <!-- 프로젝트 수정 버튼 -->
        <v-dialog scrollable width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-bind="attrs" v-on="on">
              <v-icon small>mdi-pencil</v-icon>
            </v-btn>
          </template>
          <UpdateProject />
        </v-dialog>

        <!-- 프로젝트 삭제 버튼 -->
        <v-dialog scrollable width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon small v-bind="attrs" v-on="on">
              <v-icon small>mdi-delete</v-icon>
            </v-btn>
          </template>
          <DeleteProject />
        </v-dialog>
        
      </template>
    </v-data-table>
  </v-card>
</template>


<script>
import CreateProject from '../components/CreateProject.vue'
import UpdateProject from '../components/UpdateProject.vue'
import DeleteProject from '../components/DeleteProject.vue'
import { mapState } from 'vuex'
import axios from "axios";
import { reactive } from "vue";

export default {
  data() {
    return {
      start_date: new Date().toISOString().substr(0, 10),
      end_date: new Date().toISOString().substr(0, 10),
      start_date_menu: false,
      end_date_menu: false,
    }
  },
  components:{
    CreateProject,
    UpdateProject,
    DeleteProject
  },
  methods: {
    start_date_search(v) {
      this.start_date = v;
      this.start_date_menu = false;
      this.$refs.start_date_menu.save(v);
    },
    end_date_search(v) {
      this.end_date = v;
      this.end_date_menu = false;
      this.$refs.end_date_menu.save(v);
    },
    refresh(){
      console.log(this.getProjectList())
    },
    getColor (state) {
        if (state == '완료') return 'green'
        else if (state == '진행중') return 'blue'
        else if (state == '취소') return 'yellow'
        else if (state == '지연') return 'red'
        else return 'grey'
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