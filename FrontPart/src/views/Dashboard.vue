<template>
  <v-container class="bg-surface-variant">
    <!-- 프로젝트 캘린더 -->
    <v-row no-gutters>
      <v-col class="ma-2">
        <!-- <TestProjcet /> -->
        <Calendar />
      </v-col>
    </v-row>

    <v-row no-gutters>
      <!-- 프로젝트 현황 -->
      <v-col class="ma-2">
        <ProjectStatus />
      </v-col>

      <!-- 전체 내용 요약 부분 -->
      <v-col class="ma-2" cols="4">
        <Summary />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectStatus from '../components/ProjectStatus.vue'
import Summary from '../components/Summary.vue'
import Calendar from '../components/Calendar.vue'
export default {
  data() {
    return {

    }
  },
  components: {
    Summary,
    ProjectStatus,
    Calendar
  }
}
</script>