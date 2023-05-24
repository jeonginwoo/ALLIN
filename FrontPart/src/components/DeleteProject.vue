<template>
  <v-card>
    <v-card-title class="text-h5">
      <p>정말로<span style="color:red"> 삭제 </span>하시겠습니까?</p>
    </v-card-title>
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
export default {
  data() {
    return {
      deleteData: {},
    }
  },
}
</script>
  