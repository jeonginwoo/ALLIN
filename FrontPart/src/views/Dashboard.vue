<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <!-- 전체 내용 요약 부분 -->
      <v-col class="ma-2" cols="4">
        <Summary />
      </v-col>

      <!-- 프로젝트 현황 -->
      <v-col class="ma-2">
        <ProjectStatus />
      </v-col>
    </v-row>

    <!-- 전체 프로젝트 -->
    <v-row no-gutters>
      <v-col class="ma-2">
        <Project />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProjectStatus from '../components/ProjectStatus.vue'
import Summary from '../components/Summary.vue'
import Project from './Project.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    Summary,
    ProjectStatus,
    Project
  }
}
</script>