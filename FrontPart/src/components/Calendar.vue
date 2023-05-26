<template>
  <div id="app">
    <v-app id="inspire">
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat>
              <!-- 이전 달로 이동 -->
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <!-- 월 / 년 -->
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <!-- 다음 달로 이동 -->
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-spacer></v-spacer>
              <!-- 오늘로 이동 -->
              <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
                Today
              </v-btn>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar ref="calendar" v-model="focus" color="primary" :events="events"
              @change="showEvents"></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>

<script>
export default {
  data: () => ({
    focus: '',
    selectedOpen: false,
    events: [],
  }),
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    setToday() {
      this.focus = ''
    },
    showEvents() {
      const events = [
        { name: 'Vacation', start: '2023-05-04', end: '2023-05-04', },
        { name: 'Meeting', start: '2023-05-13', end: '2023-05-13', },
        { name: '30th Birthday', start: '2023-05-21', end: '2023-05-21', },
        { name: 'New Years', start: '2023-05-21', end: '2023-05-21', },
        { name: 'Conference', start: '2023-05-27', end: '2023-05-27', },
        { name: 'Hackathon', start: '2023-05-31', end: '2023-05-31', },
      ]
      this.events = events
    },
  },
}
</script>
