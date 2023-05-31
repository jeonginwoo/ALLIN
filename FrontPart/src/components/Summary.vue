<template>
  <v-card style="height: 400px">
    <v-app-bar flat density="compact">
      <v-app-bar-title>
        <v-select label="Year" class="pa-2 text-subtitle-1 font-weight-bold" hide-details="true" solo flat dense
          style="width:550px;" :items="['2021', '2022', '2023', '2024', '2025']">
        </v-select>
      </v-app-bar-title>
    </v-app-bar>

    {{ setData() }}
    <div class="pa-2">
      <v-row class="pa-5">
        <v-col v-for="i in card" :key="i.key" cols="12" :class="!$vuetify.breakpoint.xs ? 'py-' : 'py-3'">
          <v-alert class="text-left ma-0" border="left" :color="i.color" :type="i.info">
            <span>{{ i.text }}</span>
            <span class="float-right">{{ i.value }}건</span>
          </v-alert>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";

export default {
  data() {
    return {
      card: [
        { text: `완료`, color: "green", expancolor: "green lighten-3", value: 0, info: "success", project: [], },
        { text: `진행`, color: "blue", expancolor: "blue lighten-3", value: 0, info: "info", project: [], },
        { text: `취소`, color: "yellow darken-1", expancolor: "yellow lighten-3", value: 0, info: "error", project: [], },
        { text: `지연`, color: "red", expancolor: "red lighten-3", value: 0, info: "warning", project: [], },
      ],
    };
  },
  methods: {
    setData() {
      this.card[0].value = this.getData.chart.completed;
      this.card[1].value = this.getData.chart.working;
      this.card[2].value = this.getData.chart.canceled;
      this.card[3].value = this.getData.chart.delayed;
    }
  },
  setup() {
    const getData = reactive({
      chart: {},
    });
    axios.get("/api/chart").then((res) => {
      getData.chart = res.data;
    });
    return {
      getData,
    }
  },
};
</script>