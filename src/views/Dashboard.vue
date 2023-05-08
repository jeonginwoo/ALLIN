<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col class="ma-2" cols="4">
        <v-card>
          <v-autocomplete 
            class="pa-3"
            :items="['2020', '2021', '2022', '2023']"
          ></v-autocomplete>
          <v-sheet class="pa-2 ma-2">
            <v-alert
              title="Alert title"
              type="success"
              text
            >완료</v-alert>
            <v-alert
              title="Alert title"
              type="info"
              text
            >진행</v-alert>
            <v-alert
              title="Alert title"
              type="warning"
              text
            >취소</v-alert>
            <v-alert
              title="Alert title"
              type="error"
              text
            >지연</v-alert>
          </v-sheet>
        </v-card>
      </v-col>
      <v-col class="ma-2">
        <v-card class="">
          <v-sheet class="pa-2 ma-2">
            차트
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col class="ma-2">
        <v-card>
          <v-sheet class="pa-2 ma-2">
            프로젝트 리스트
          </v-sheet>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
