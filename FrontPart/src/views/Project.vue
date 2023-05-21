<template>
  <v-card>
    <v-layout>
      <v-app-bar flat density="compact">
        <v-app-bar-title>프로젝트 리스트</v-app-bar-title>
      </v-app-bar>
    </v-layout>
<<<<<<< Updated upstream
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
      <v-col :cols="!$vuetify.breakpoint.mobile ? 'md-2' : 12" align="left" style="margin-top: 0.5cm;">
        <v-dialog v-model="isAddProject" width="600" scrollable :fullscreen="$vuetify.breakpoint.mobile">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon outlined small class="mr-3" color="primary" v-bind="attrs"
              v-on="on"><v-icon>mdi-shape-rectangle-plus</v-icon>
            </v-btn>
          </template>
          <AddProject @cancel="isAddProject = false" @create="createProject" />
        </v-dialog>
        <v-btn icon outlined small color="success" @click="refresh()"><v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <!-- :items="getProject.projects" 데이터베이스에서 가져온 값 쓰려면 -->
    <v-data-table :headers="headers1" :items="projects1" :footer-props="{
      'items-per-page-text': '페이지 당',
      'items-per-page-options': [5, 10, 15, 20],
      'show-current-page': true,
    }" class="elevation-0"></v-data-table>
=======

    <!-- 프로젝트 목록 부분 -->
    <v-data-table :headers="headers" :items="getData.projects" sort-by="calories" class="elevation-1">

      <!-- 프로젝트 목록 상단 부분 (날짜, 상태, 프로젝트명) -->
      <template v-slot:top>
        <v-toolbar flat>
          <v-row class="ml-2 mt-5">

            <!-- 시작일 검색 부분 -->
            <v-col>
              <v-menu ref="start_date_menu" v-model="start_date_menu" :close-on-content-click="false"
                :return-value.sync="start_date" transition="scale-transition" offset-y min-width="290px">
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
              <v-menu ref="end_date_menu" v-model="end_date_menu" :close-on-content-click="false"
                :return-value.sync="end_date" transition="scale-transition" offset-y min-width="290px">
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

            <v-col>
              <!-- 프로젝트 생성 -->
              <v-dialog v-model="dialogCreate" scrollable width="600px">
                <CreateProject @create="createData" @cancel="dialogCreate = false" />
              </v-dialog>
              <v-btn class="mr-2" icon outlined small color="primary" @click="dialogCreate = true">
                <v-icon>mdi-shape-rectangle-plus</v-icon>
              </v-btn>
              <!-- 새로고침 -->
              <v-btn icon outlined small color="success">
                <v-icon>mdi-refresh</v-icon>
              </v-btn>
            </v-col>
          </v-row>

          <!-- 다이어로그 창 -->
          <!-- 프로젝트 생성 창 -->
          <v-dialog v-model="dialogUpdate" max-width="500px">
            <UpdateProject @update="updateData" @cancel="dialogUpdate = false" />
          </v-dialog>
          <!-- 프로젝트 삭제 창 -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <DeleteProject @delete="deleteData" @cancel="dialogDelete = false" />
          </v-dialog>

        </v-toolbar>
      </template>

      <!-- 다이어로그 버튼 -->
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="dialogUpdate = true">
          mdi-pencil
        </v-icon>
        <v-icon small @click="dialogDelete = true">
          mdi-delete
        </v-icon>
      </template>

      <!-- 상태 색깔 -->
      <template v-slot:item.state="{ item }">
        <v-chip :color="getColor(item.state)" dark>
          {{ item.state }}
        </v-chip>
      </template>
    </v-data-table>
>>>>>>> Stashed changes
  </v-card>
</template>


<script>
import { mapState } from 'vuex'
import AddProject from '../components/AddProject.vue';
import axios from "axios";
import { reactive } from "vue";

export default {

  components: {
    AddProject,
  },
  data1() {
    return {
<<<<<<< Updated upstream
      loading: false,
      modal1: false,
      modal2: false,
      error: '',
      dataCollection: null,
      files: null,
      isAddProject: false,
      editingProject: {},
      filter: {
        projectStart: [null],
        projectDue: [null],
        state: '',
        name: ''
      },
      stateList: ['미착수', '진행중', '완료', '지연', '취소'],

      snackbar: false,
      message: '',
      state: '',
      response: ''
    }
  },

  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      s_date: new Date().toISOString().substr(0, 10),
      e_date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false
    }
=======
      start_date: new Date().toISOString().substr(0, 10),
      end_date: new Date().toISOString().substr(0, 10),
      start_date_menu: false,
      end_date_menu: false,

      dialogCreate: false,
      dialogUpdate: false,
      dialogDelete: false,
    }
  },
  components: {
    CreateProject,
    UpdateProject,
    DeleteProject
>>>>>>> Stashed changes
  },
  methods: {
    s_date_search(v) {
      this.s_date = v;
      this.menu1 = false;
      this.$refs.menu1.save(v);
    },
<<<<<<< Updated upstream
    e_date_search(v) {
      this.e_date = v;
      this.menu2 = false;
      this.$refs.menu2.save(v);
    }
=======
    end_date_search(v) {
      this.end_date = v;
      this.end_date_menu = false;
      this.$refs.end_date_menu.save(v);
    },
    refresh() {
      console.log(this.getProjectList())
    },
    getColor(state) {
      if (state == '완료') return 'green'
      else if (state == '진행중') return 'blue'
      else if (state == '취소') return 'yellow'
      else if (state == '지연') return 'red'
      else return 'grey'
    },

    // 프로젝트 관리 함수
    createData(data) {  // 프로젝트 생성
      console.log("프로젝트 생성 확인")
      this.dialogCreate = false
      axios.post('/api/project_create', data)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error);
        });
    },
    updateData(data) {  // 프로젝트 수정
      console.log("프로젝트 수정 확인")
      this.dialogUpdate = false
      axios.post('/api/project_update', data)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteData(data) {  // 프로젝트 삭제
      console.log("프로젝트 삭제 확인")
      this.dialogDelete = false
      axios.post('/api/project_delete', data)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error);
        });
    },
>>>>>>> Stashed changes
  },
  computed: {
    ...mapState(["headers1", "projects1"])
  },
<<<<<<< Updated upstream

  // 데이터베이스 데이터 가져오기
  setup(){
    const getProject = reactive({
=======
  setup() {
    const getData = reactive({
>>>>>>> Stashed changes
      projects: [],
    });
    axios.get("/api/projects").then((res) => {
      getProject.projects = res.data.projects;
    });
    return {
      getProject,
    }
  },
}
</script>