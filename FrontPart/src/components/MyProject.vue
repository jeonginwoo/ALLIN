<template>
  <v-card>
    <v-card-title>마이 프로젝트</v-card-title>
    <v-divider></v-divider>

    <!-- 프로젝트 목록 부분 -->
    <v-data-table hide-default-footer :headers="mypage_headers" :items="userProject" class="elevation-1">
    </v-data-table>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="grey darken-1" @click="$emit('close')">
        CLOSE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
  
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
  props: ["userProject"],
  computed: {
    ...mapState(["mypage_headers"])
  },

}
</script>
