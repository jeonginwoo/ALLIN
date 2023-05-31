<template>
  <div>
    <canvas ref="barChart" />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

import axios from "axios";
import { reactive } from "vue";

export default {
  data: () => ({
    type: 'doughnut',
    data: {
      labels: ['완료', '진행', '취소', '지연'],
      datasets: [{
        label: 'Project Status',
        data: [12, 19, 3, 5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  }),
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      console.log(this.getData.chart)
      // this.data.datasets[0].data[0] = this.getData.chart.completed;
      // this.data.datasets[0].data[1] = this.getData.chart.working;
      // this.data.datasets[0].data[2] = this.getData.chart.canceled;
      // this.data.datasets[0].data[3] = this.getData.chart.delayed;
      new Chart(this.$refs.barChart, {
        type: this.type,
        data: this.data,
        options: this.options
      })
    },
    asdf() {
      console.log(this.getData.chart)
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
      getData
    }
  },
}
</script>