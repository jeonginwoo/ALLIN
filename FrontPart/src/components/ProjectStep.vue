<template>
  <v-stepper alt-labels v-bind:value="step">
    <v-stepper-header>
      <v-stepper-step step="1">
        기획
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="2">
        분석
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="3">
        설계
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="4">
        구축
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="5">
        테스트
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step step="6">
        전개
      </v-stepper-step>
      <v-divider></v-divider>

      <v-stepper-step color="green" step="7">
        완료
      </v-stepper-step>
    </v-stepper-header>
  </v-stepper>
</template>

<script>
export default {
  props: ["step"]
}
</script>