<template>
  <v-layout class="justify-center">
    <v-card flat class="py-12" style="width: 1000px">
      <v-card-text>
        <v-row>
          <v-col align="center">
            <v-btn color="red" style="width: 130px; height: 130px" @click="changeAppBarColor('red')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="#F06292" style="width: 130px; height: 130px" @click="changeAppBarColor('#F06292')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="orange" style="width: 130px; height: 130px" @click="changeAppBarColor('orange')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="#FFCC80" style="width: 130px; height: 130px" @click="changeAppBarColor('#FFCC80')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="yellow" style="width: 130px; height: 130px" @click="changeAppBarColor('yellow')"></v-btn>
          </v-col>
        </v-row>

        <v-row>
          <v-col align="center">
            <v-btn color="light-green" style="width: 130px; height: 130px"
              @click="changeAppBarColor('light-green')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="green" style="width: 130px; height: 130px" @click="changeAppBarColor('green')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="#18FFFF" style="width: 130px; height: 130px" @click="changeAppBarColor('#18FFFF')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="blue" style="width: 130px; height: 130px" @click="changeAppBarColor('blue')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="indigo" style="width: 130px; height: 130px" @click="changeAppBarColor('indigo')"></v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col align="center">
            <v-btn color="#AB47BC" style="width: 130px; height: 130px" @click="changeAppBarColor('#AB47BC')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="#827717" style="width: 130px; height: 130px" @click="changeAppBarColor('#827717')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="brown" style="width: 130px; height: 130px" @click="changeAppBarColor('brown')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="#757575" style="width: 130px; height: 130px" @click="changeAppBarColor('#757575')"></v-btn>
          </v-col>
          <v-col align="center">
            <v-btn color="black" style="width: 130px; height: 130px" @click="changeAppBarColor('black')"></v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  methods: {
    changeAppBarColor(color) {
      this.$root.$emit('change-app-bar-color', color);
    }
  }
}
</script>