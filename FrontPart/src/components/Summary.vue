<template>
  <v-card style="height: 400px">
    <v-layout>
      <v-flex xs12>
        <v-app-bar flat density="compact">
          <v-select
            label="년도"
            :items="['2020', '2021', '2023', '2024', '2025']"
          ></v-select>
        </v-app-bar>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex
        v-for="i in card"
        :key="i.key"
        xs12
        :class="!$vuetify.breakpoint.xs?'py-5':'py-3'"
      >
        <v-alert
          class="text-left ma-0"
          border="left"
          :color="i.color"
          :type="i.info"
        >
          <span>{{ i.text }}</span>
          <span class="float-right">{{ i.value }}건</span>
        </v-alert>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      card: [
        { text: '완료', color: 'green', expancolor: 'green lighten-3', value: 0, info: 'success', project: [] },
        { text: '진행', color: 'blue', expancolor: 'blue lighten-3', value: 0, info: 'info', project: [] },
        { text: '취소', color: 'yellow darken-1', expancolor: 'yellow lighten-3', value: 0, info: 'error', project: [] },
        { text: '지연', color: 'red', expancolor: 'red lighten-3', value: 0, info: 'warning', project: [] },
      ],
      projectData: [],
      projectsOptions: Project_Columns,
    };
  },
};
</script>
