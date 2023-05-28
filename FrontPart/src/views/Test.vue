<template>
  <div>
    <TestProject />
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import TestProject from '../components/TestProject.vue'
Chart.register(...registerables)

export default {
  components:{
    TestProject,
  }
}
</script>