<template>
  <v-card>
    <v-card-title>프로젝트 생성</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 400px;">
      <v-text-field v-model="createData.Pname" label="프로젝트 이름"></v-text-field>
      <v-text-field v-model="createData.mgr" label="담당자"></v-text-field>
      <v-text-field v-model="createData.progress" label="현 진행 단계"></v-text-field>
      <v-text-field v-model="createData.start_date" label="시작일"></v-text-field>
      <v-text-field v-model="createData.deadline" label="기한"></v-text-field>
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
        progress: this.progress,
        start_date: this.start_date,
        deadline: this.deadline,
      }
    }
  },
}
</script>
  