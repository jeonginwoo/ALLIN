<template>
  <v-card>
    <div style="width:1440px">
    <v-layout>
      <v-app-bar flat density="compact">
        <v-app-bar-title>산출물 현황</v-app-bar-title>
      </v-app-bar>
    </v-layout>
 <v-row no-gutters>
      <v-col class="ma-2">
        <v-card style="height:600px">
          <v-card-title>
            프로젝트
          </v-card-title>
    <v-data-table :headers="headers2" :items="projects2" hide-default-footer class="elevation-0" fixed height></v-data-table>
        </v-card>
      </v-col>
      <v-col class="ma-2">
        <v-card style="height:600px">
          <v-card-title>
            산출물 목록
          </v-card-title>
    <v-data-table :headers="headers3" :items="projects3" hide-default-footer class="elevation-0"></v-data-table>
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
    ...mapState(["headers2", "projects2","headers3", "projects3" ])
  }
}
</script>