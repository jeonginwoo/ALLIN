<template>
  <v-container style="max-width: 650px;">
    <v-timeline dense clipped>

      <v-timeline-item class="mb-6" hide-dot>
        <span>사용 로그</span>
      </v-timeline-item>

      <!-- 사용 로그 출력 부분 -->
      <v-timeline-item class="mb-4" color="blue" icon-color="grey lighten-2" small v-for="log in getData.logs">
        <v-row justify="space-between">
          <v-col cols="5">
            {{ log.time }}
          </v-col>
          <v-col class="text-right" cols="7">
            사용자 : {{ log.user_name }}
            <br>
            프로젝트 : {{ log.pname }}
            <br>
            내용 : {{ log.summary }}
            <br>
            {{ log.details }}
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
      logs: [],
    });
    axios.get("/api/uselog").then((res) => {
      getData.logs = res.data.logs;
    });
    return {
      getData,
    }
  },
}
</script>