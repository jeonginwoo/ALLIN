<template>
  <v-container style="max-width: 650px;">
    <v-timeline dense clipped>

      <v-timeline-item class="mb-6" hide-dot>
        <span>사용 로그</span>
      </v-timeline-item>

      <!-- 사용 로그 출력 부분 -->
      <v-timeline-item class="mb-4" color="blue" icon-color="grey lighten-2" small v-for="project in getData.projects">
        <v-row justify="space-between">
          <v-col cols="5">
            {{ project.start_date }}
          </v-col>
          <v-col class="text-right" cols="7">
            {{ project.user_name }}(사용자 이름) - {{ project.Pname }}(프로젝트 이름)
          </v-col>
        </v-row>
      </v-timeline-item>

    </v-timeline>
  </v-container>
</template>


<script>
import { mapState } from 'vuex'
import { reactive } from "vue";
import axios from "axios";

export default {
  data: () => ({
    userProject: []
  }),

  computed: {
    ...mapState(["userInfo"]),
    timeline() {
      return this.events.slice().reverse()
    },
  },
  methods: {
    getUserNo() {
      console.log("유저 번호 : ", this.userInfo.userNo);
      axios.post('/api/my_project', { user_no: this.userInfo.userNo })
        .then(res => {
          this.userProject = res.data.projects;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  setup() {
    const getData = reactive({
      projects: [],
    });
    axios.get("/api/project").then((res) => {
      getData.projects = res.data.projects;
    });
    return {
      getData,
    }
  },
}
</script>