<template>
  <v-card>
    <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="red" @click="$emit('delete', deleteData)">
        DELETE
      </v-btn>
      <v-btn text color="grey darken-1" @click="$emit('cancel')">
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
      deleteData: {
        Pno: this.Pno,
      }
    }
  },
}
</script>
  