<template>
  <v-card>
    <div style="width:1440px">
      <v-layout>
        <v-app-bar flat density="compact">
          <v-app-bar-title>산출물 현황</v-app-bar-title>
        </v-app-bar>
      </v-layout>
      <v-row no-gutters>

        <!-- 프로젝트 목록 부분 -->
        <v-col class="ma-2">
          <v-card style="height:700px">
            <v-card-title>
              프로젝트
            </v-card-title>
            <v-data-table :headers="headers" :footer-props="{
              'items-per-page-text': '페이지 당',
              'items-per-page-options': [5, 10, 15, 20],
              'show-current-page': true,
            }" class="elevation-0" fixed height></v-data-table>
          </v-card>
        </v-col>

        <!-- 산출물 목록 부분 -->
        <v-col class="ma-2">
          <v-card style="height:700px">
            <v-card-title>
              산출물 목록
            </v-card-title>
            <v-data-table :headers="headers" :footer-props="{
              'items-per-page-text': '페이지 당',
              'items-per-page-options': [5, 10, 15, 20],
              'show-current-page': true,
            }" class="elevation-0"></v-data-table>
          </v-card>
        </v-col>

      </v-row>
    </div>
  </v-card>
</template>


<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(["headers"])
  }
}
</script>