<template>
  <v-container style="max-width: 650px;">
    <v-timeline align-top dense>

      <v-timeline-item class="mb-6" hide-dot>
        <span>사용 로그</span>
      </v-timeline-item>

      <!-- 사용 로그 출력 부분 -->
      <v-timeline-item class="mb-4" color="blue" icon-color="grey lighten-2" small v-for="log in getData.logs">
        <v-row justify="space-between">
          <v-col cols="5">
            {{ log.time }}
            <br>
            {{ log.user_name }}
          </v-col>
          <v-col class="text-left" cols="7">
            <span style="font-weight:bold">&lt{{ log.pname }}> {{ log.summary }}</span>
            <br>
            {{ log.detail_m }}
            <br>
            {{ log.detail_d }}
            <br>
            {{ log.detail_p }}
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