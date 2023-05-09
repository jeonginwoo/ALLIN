<template>
  <v-container>
    <v-card style="height:400px">
          <v-layout>
            <v-app-bar
              flat
              density="compact"
            >
              <v-app-bar-title>프로젝트 리스트</v-app-bar-title>
            </v-app-bar>
          </v-layout>   
<v-row>
  <v-col cols="12" lg="2">
    <v-menu
      ref="menu1"
      v-model="menu1"
      :close-on-content-click="false"
      :return-value.sync="s_date"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="s_date"
          label="시작일"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="s_date" no-title scrollable :max="e_date">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
        <v-btn text color="primary" @click="s_date_search(s_date)">OK</v-btn>
      </v-date-picker>
    </v-menu>
  </v-col>
  
  <v-col cols="12" lg="2">
    <v-menu
      ref="menu2"
      v-model="menu2"
      :close-on-content-click="false"
      :return-value.sync="e_date"
      transition="scale-transition"
      offset-y
      min-width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="e_date"
          label="완료예정일"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker v-model="e_date" no-title scrollable :min="s_date">
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
        <v-btn text color="primary" @click="e_date_search(e_date)">OK</v-btn>
      </v-date-picker>
    </v-menu>
  </v-col>
  <v-col cols="12" lg="2">
    <v-autocomplete
                  label="상태"
                  :items="['완료', '진행중', '미착수', '지연', '취소']"
                ></v-autocomplete>
  </v-col>
  <v-col cols="12" lg="3"
          >
            <v-text-field
              label="프로젝
              트명"
              required
            ></v-text-field>
          </v-col>
 <v-btn>
 <v-icon
      large
      color="orange darken-2"
    >
      mdi-arrow-up-bold-box-outline
    </v-icon>
     </v-btn>
      <v-btn>
 <v-icon
      large
      color="orange darken-2"
    >
      mdi-arrow-up-bold-box-outline
    </v-icon>
     </v-btn>
</v-row>
<v-data-table
    :headers="headers"
    :items="projects"
    hide-default-footer
    class="elevation-1"
  ></v-data-table>

</v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      s_date: new Date().toISOString().substr(0, 10),
      e_date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false
    }
  },
  methods: {
    s_date_search(v) {
      this.s_date = v;
      this.menu1 = false;
      this.$refs.menu1.save(v);
    },
    e_date_search(v) {
      this.e_date = v;
      this.menu2 = false;
      this.$refs.menu2.save(v);
    }
  },
  data () {
      return {
        headers: [
          {
            text: '프로젝트명',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: '담당자', value: 'person' },
          { text: '상태', value: 'state' },
          { text: '진행률', value: 'progress' },
          { text: '시작일', value: 'start' },
          { text: '완료예정일', value: 'end' },
        ],
        projects: [
          {
            name: 'Frozen Yogurt',
            person: 159,
            state: 6.0,
            progress: 24,
            start: 4.0,
            end: 1,
          },
          {
            name: 'Ice cream sandwich',
            person: 237,
            state: 9.0,
            progress: 37,
            start: 4.3,
            end: 1,
          },
          {
            name: 'Eclair',
            person: 262,
            state: 16.0,
            progress: 23,
            start: 6.0,
            end: 7,
          },
          {
            name: 'Cupcake',
            person: 305,
            state: 3.7,
            progress: 67,
            start: 4.3,
            end: 8,
          },
          {
            name: 'Gingerbread',
            person: 356,
            state: 16.0,
            progress: 49,
            start: 3.9,
            end: 16,
          },
          {
            name: 'Jelly bean',
            person: 375,
            state: 0.0,
            progress: 94,
            start: 0.0,
            end: 0,
          },
          {
            name: 'Lollipop',
            person: 392,
            state: 0.2,
            progress: 98,
            start: 0,
            end: 2,
          },
          {
            name: 'Honeycomb',
            person: 408,
            state: 3.2,
            progress: 87,
            start: 6.5,
            end: 45,
          },
          {
            name: 'Donut',
            person: 452,
            state: 25.0,
            progress: 51,
            start: 4.9,
            end: 22,
          },
          {
            name: 'KitKat',
            person: 518,
            state: 26.0,
            progress: 65,
            start: 7,
            end: 6,
          },
        ],
      }
    },
}
</script>