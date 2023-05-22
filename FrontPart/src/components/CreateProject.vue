<template>
  <v-card>
    <v-card-title>프로젝트 생성</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 400px;">
      <v-text-field v-model="createData.Pname" label="Pname"></v-text-field>
      <v-text-field v-model="createData.mgr" label="mgr"></v-text-field>
      <v-text-field v-model="createData.state" label="state"></v-text-field>
      <v-text-field v-model="createData.progress" label="progress"></v-text-field>
      <v-text-field v-model="createData.start_date" label="start_date"></v-text-field>
      <v-text-field v-model="createData.deadline" label="deadline"></v-text-field>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text color="blue" @click="$emit('create', createData)">
        CREATE
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
      createData: {
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
  