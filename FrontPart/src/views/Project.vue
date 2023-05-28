<template>
  <v-card>
    <v-layout>
      <v-app-bar flat density="compact">
        <v-app-bar-title>프로젝트 리스트</v-app-bar-title>
      </v-app-bar>
    </v-layout>


    <!-- 프로젝트 목록 부분 -->
    <v-data-table :search="search" :headers="headers" :items="getData.projects" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-row class="ml-2 mt-5">

            <!-- 상태 검색 부분 -->
            <v-col>
              <v-autocomplete v-model="search" label="상태" :items="['진행중', '지연', '완료']"></v-autocomplete>
            </v-col>

            <!-- 프로젝트명 검색 부분 -->
            <!-- <v-col>
              <v-text-field label="프로젝트명" required></v-text-field>
            </v-col> -->
            <v-col>
              <v-text-field v-model="search" append-icon="mdi-magnify" label="Search"></v-text-field>
            </v-col>

            <v-col>
              <!-- 프로젝트 추가 버튼 -->
              <v-btn class="mr-2" icon outlined small color="primary" @click="dialogCreate = true">
                <v-icon>mdi-shape-rectangle-plus</v-icon>
              </v-btn>

              <!-- 새로고침 버튼 -->
              <v-btn icon outlined small color="success" @click="refresh()">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-toolbar>
      </template>

      <template v-slot:item.actions="{ item }">
        <!-- 프로젝트 수정 버튼 -->
        <v-icon small class="mr-2" @click="getUpdatePno(item)">
          mdi-pencil
        </v-icon>
        <!-- 프로젝트 삭제 버튼 -->
        <v-icon small @click="getDeletePno(item.Pno)">
          mdi-delete
        </v-icon>
      </template>

      <!-- 상태 색깔 -->
      <template v-slot:item.state="{ item }">
        <v-menu offset-y :nudge-width="700">
          <template v-slot:activator="{ on, attrs }">
            <v-chip label outlined :color="getColor(item.state)" dark v-bind="attrs" v-on="on">
              {{ item.state }}
            </v-chip>
          </template>
          <ProjectStep :step="item.progress" />
        </v-menu>
      </template>
    </v-data-table>

    <!-- 다이어로그 창 -->
    <v-dialog v-model="dialogCreate" persistent scrollable width="400px">
      <CreateProject @create="createData" @cancel="dialogCreate = false" />
    </v-dialog>
    <v-dialog v-model="dialogUpdate" persistent max-width="400px">
      <UpdateProject @update="updateData" @cancel="dialogUpdate = false" :preData="preData" />
    </v-dialog>
    <v-dialog v-model="dialogDelete" persistent max-width="400px">
      <DeleteProject @delete="deleteData" @cancel="dialogDelete = false" />
    </v-dialog>
  </v-card>
</template>


<script>
import CreateProject from '../components/CreateProject.vue'
import UpdateProject from '../components/UpdateProject.vue'
import DeleteProject from '../components/DeleteProject.vue'
import ProjectStep from '../components/ProjectStep.vue'
import { mapState } from 'vuex'

import axios from "axios";
import { reactive } from "vue";

export default {
  data() {
    return {
      search: '',   // 데이터 테이블 검색

      preData: {},  // 업데이트 이전 데이터
      updatePno: null,  // 업데이트 프로젝트 번호
      deletePno: null,  // 삭제 프로젝트 번호

      // 다이어로그 창 on/off
      dialogCreate: false,
      dialogUpdate: false,
      dialogDelete: false,
    }
  },
  components: {
    CreateProject,
    UpdateProject,
    DeleteProject,
    ProjectStep
  },
  methods: {
    refresh() {
            this.search = '';
    },
    getColor(state) {
      if (state == '완료') return 'green'
      else if (state == '진행중') return 'blue'
      else if (state == '취소') return 'yellow'
      else if (state == '지연') return 'red'
      else return 'grey'
    },

    // 수정, 삭제하는 프로젝트의 Pno값 구하는 함수
    getUpdatePno(project) {
      console.log("수정하는 프로젝트 번호: ", project.Pno);
      this.preData = project
      this.dialogUpdate = true; // update dialog 창 열기
      this.updatePno = project.Pno;
    },
    getDeletePno(Pno) {
      console.log("삭제하는 프로젝트 번호: ", Pno);
      this.dialogDelete = true; // delete dialog 창 열기
      this.deletePno = Pno;
    },

    // 프로젝트 관리 함수
    createData(data) { // 프로젝트 생성
      console.log("프로젝트 생성");
      this.dialogCreate = false;
      data.user_no = this.userInfo.userNo;
      axios.post('/api/project_create', data)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateData(data) { // 프로젝트 수정
      console.log("프로젝트 수정");
      this.dialogUpdate = false;
      data.Pno = this.updatePno;
      data.user_no = this.userInfo.userNo;
      axios.post('/api/project_update', data)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      this.updatePno = null;
      this.preData = {};
    },
    deleteData(data) { // 프로젝트 삭제
      console.log("프로젝트 삭제");
      this.dialogDelete = false;
      data.Pno = this.deletePno;
      data.user_no = this.userInfo.userNo;
      axios.post('/api/project_delete', data)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log(error);
        });
      this.deletePno = null;
    },
  },
  computed: {
    ...mapState(["headers", "userInfo"])
  },
  setup() {
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