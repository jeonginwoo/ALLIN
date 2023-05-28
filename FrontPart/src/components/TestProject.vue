<template>
  <div id="app">
    <v-app id="inspire">
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat>
              <!-- 월 / 년 -->
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <!-- 이전 달로 이동 -->
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
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
            <v-calendar style="max-height:500px" ref="calendar" v-model="focus" color="primary" :events="events" :event-color="getEventColor"
              :type="type" @click:event="showEvent"
              @change="updateRange"></v-calendar>

            <!-- 카드 메뉴 -->
            <v-menu v-model="selectedOpen" :close-on-content-click="false" :activator="selectedElement" offset-x>
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-heart</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-dots-vertical</v-icon>
                  </v-btn>
                </v-toolbar>
                <v-card-text>
                  <span v-html="selectedEvent.details"></span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    Cancel
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
            
          </v-sheet>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>
  
<script>
import axios from "axios";
import { reactive } from "vue";

export default {
  data: () => ({
    focus: '',
    type: 'month',  // 캘린더 형식  (월별)
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],
    colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
    names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
  }),
  mounted() {
    this.$refs.calendar.checkChange()
  },
  methods: {
    getEventColor(event) {
      return event.color
    },
    setToday() {  // 오늘로 이동
      this.focus = ''
    },
    prev() {  // 이전 달로 이동
      this.$refs.calendar.prev()
    },
    next() {  // 다음 달로 이동
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay,
        })
      }

      this.events = events
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    },
  },
  setup() {
    const getData = reactive({
      projects: [],
    });
    axios.get("/api/project").then((res) => {
      getData.projects = res.data.projects;
    });
    return {
      getData,
    }
  },
}
</script>