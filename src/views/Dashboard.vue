<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <!-- 전체 내용 요약 부분 -->
      <v-col class="ma-2" cols="4">
        <v-card style="height:400px">
          <v-layout>
            <v-app-bar flat density="compact">
              <v-app-bar-title>
                <v-autocomplete label="year" :items="['2020', '2021', '2022', '2023']"></v-autocomplete>
              </v-app-bar-title>
            </v-app-bar>
          </v-layout>
          <v-alert title="Alert title" type="success" text>완료</v-alert>
          <v-alert title="Alert title" type="info" text>진행</v-alert>
          <v-alert title="Alert title" type="warning" text>취소</v-alert>
          <v-alert title="Alert title" type="error" text>지연</v-alert>
        </v-card>
      </v-col>

      <!-- 프로젝트 현황 -->
      <v-col class="ma-2">
        <v-card style="height:400px">
          <v-layout>
            <v-app-bar flat density="compact"><v-app-bar-title>전체 프로젝트 현황</v-app-bar-title>
            </v-app-bar>
          </v-layout>
        </v-card>
      </v-col>
    </v-row>

    <!-- 전체 프로젝트 -->
    <v-row no-gutters>
      <!-- <v-col class="ma-2">
        <v-card style="height:400px">
          <v-layout>
            <v-app-bar
              flat
              density="compact"
            >
              <v-app-bar-title>프로젝트 리스트</v-app-bar-title>
            </v-app-bar>
          </v-layout>
        </v-card>
      </v-col> -->
      <Project />
    </v-row>
  </v-container>
</template>

<script>
import Project from './Project.vue'

export default {
  data() {
    return {

    }
  },
  components: {
    Project
  }
}
</script>