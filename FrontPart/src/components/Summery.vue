<template>
  <v-card style="height:400px">
    <v-layout>
      <v-app-bar flat density="compact">
        <v-app-bar-title>
          <v-autocomplete label="year" :items="['2020', '2021', '2022', '2023']"></v-autocomplete>
        </v-app-bar-title>
      </v-app-bar>
    </v-layout>
    <div class="pa-2">
      <v-alert title="Alert title" type="success" text>완료</v-alert>
      <v-alert title="Alert title" type="info" text>진행</v-alert>
      <v-alert title="Alert title" type="warning" text>취소</v-alert>
      <v-alert title="Alert title" type="error" text>지연</v-alert>
    </div>
  </v-card>
</template>