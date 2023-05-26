<template>
  <v-card max-width="400" class="mx-auto">
    <v-card-title>마이 프로젝트</v-card-title>
    <v-divider></v-divider>
    <v-container>
      <v-row dense>
        <v-col v-for="(item, i) in items" :key="i" cols="12">
          <v-card>
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title class="text-h5" v-text="item.title"></v-card-title>

                <v-card-actions tile>
                  {{ item.artist }}
                </v-card-actions>
              </div>
              <div class="ma-3" tile style="font-size: 60px; color:indigo">
                D-{{ item.d_day }}
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="grey darken-1" @click="$emit('close')">
        CLOSE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        title: '#3 Eclair',
        artist: '조성현',
        d_day: 31,
      },
      {
        title: '#5 Tea',
        artist: '정인우',
        d_day: 64,
      },
      {
        title: '#12 Test2',
        artist: '남동균',
        d_day: 97,
      },
    ],
  }),
}
</script>