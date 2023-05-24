<template>
  <v-container class="bg-surface-variant">
    <!-- 프로젝트 캘린더 -->
    <v-row no-gutters>
      <v-col class="ma-2">
        <!-- <TestProjcet /> -->
        <TestProjcet />
      </v-col>
    </v-row>

    <!-- 전체 프로젝트 -->
    <!-- <v-row no-gutters>
      <v-col class="ma-2">
        <Project />
      </v-col>
    </v-row> -->

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
import TestProjcet from '../components/TestProject.vue'
import ProjectStatus from '../components/ProjectStatus.vue'
import Summary from '../components/Summary.vue'
import Project from './Project.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    TestProjcet,
    Summary,
    ProjectStatus,
    Project
  }
}
</script>