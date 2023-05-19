<template>
  <v-card>
    <v-card-title>Select Country</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 400px;">
      <v-text-field v-model="Pname" label="Pname"></v-text-field>
      <v-text-field v-model="mgr" label="mgr"></v-text-field>
      <v-text-field v-model="state" label="state"></v-text-field>
      <v-text-field v-model="progress" label="progress"></v-text-field>
      <v-text-field v-model="start_date" label="start_date"></v-text-field>
      <v-text-field v-model="deadline" label="deadline"></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="updateDate">
        UPDATE
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      Pname: this.Pname,
      mgr: this.mgr,
      state: this.state,
      progress: this.progress,
      start_date: this.start_date,
      deadline: this.deadline,
    }
  },
  methods: {
    updateDate: function () {
      const data = {
        // abc: 'hihi'
        Pname: this.Pname,
        mgr: this.mgr,
        state: this.state,
        progress: this.progress,
        start_date: this.start_date,
        deadline: this.deadline,
        end_date: null,
      }
      axios.post('/api/test', data)
        .then(res => {
          console.log(res)
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
}
</script>
