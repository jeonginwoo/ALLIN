<template>
  <v-card>
    <v-layout>
      <v-app-bar flat density="compact">
        <v-app-bar-title><div>TODO LIST</div></v-app-bar-title>
      </v-app-bar>
    </v-layout>
      <!-- <li>진행중인 프로젝트.</li>
      <li>todolist, 마감까지 남은 시간(D-OOO)</li>
      <li>작업량 요약본, 도표</li> -->

     <!-- 프로젝트 목록 부분 -->
    <v-data-table 
    :headers="mypage_headers" 
    :items="getData.projects"  
    :footer-props="{
      'items-per-page-text': '페이지 당',
      'items-per-page-options': [5, 10, 15, 20],
      'show-current-page': true,
    }" 
    class="elevation-0">

    <!-- 상태 색깔 -->
    <template v-slot:item.state="{ item }">
      <v-chip
        :color="getColor(item.state)"
        dark
      >
        {{ item.state }}
      </v-chip>
    </template>
    </v-data-table>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import axios from "axios";
import { reactive } from "vue";

export default {
  data() {
    return {
    
    }
  },
  methods: {
    getColor (state) {
        if (state == '완료') return 'green'
        else if (state == '진행중') return 'blue'
        else if (state == '취소') return 'yellow'
        else if (state == '지연') return 'red'
        else return 'grey'
      },
  },
  computed: {
    ...mapState(["mypage_headers"])
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