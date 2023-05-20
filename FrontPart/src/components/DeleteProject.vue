<template>
  <v-card>
    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="red" @click="deleteData">
        DELETE
      </v-btn>
      <v-btn text color="grey darken-1">
        CANCEL
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
    deleteData: function () {
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
      axios.post('/api/project_delete', data)
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
  