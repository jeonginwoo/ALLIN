<template>
  <v-card>
    <v-card-title>프로젝트 수정</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 400px;">
      <v-text-field v-model="updateDate.Pname" label="Pname"></v-text-field>
      <v-text-field v-model="updateDate.mgr" label="mgr"></v-text-field>
      <v-text-field v-model="updateDate.state" label="state"></v-text-field>
      <v-text-field v-model="updateDate.progress" label="progress"></v-text-field>
      <v-text-field v-model="updateDate.start_date" label="start_date"></v-text-field>
      <v-text-field v-model="updateDate.deadline" label="deadline"></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="purple" @click="$emit('update', updateDate)">
        UPDATE
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
      updateDate: {
        Pname: this.Pname,
        mgr: this.mgr,
        state: this.state,
        progress: this.progress,
        start_date: this.start_date,
        deadline: this.deadline,
      }
    }
  },
}
</script>
  