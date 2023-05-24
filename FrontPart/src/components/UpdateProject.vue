<template>
  <v-card>
    <v-card-title>프로젝트 수정</v-card-title>
    <v-divider></v-divider>
    <v-card-text style="height: 400px;">
      <v-text-field v-model="updateDate.mgr" label="담당자"></v-text-field>
      <v-text-field v-model="updateDate.progress" label="현 진행 단계"></v-text-field>
      <v-text-field v-model="updateDate.deadline" label="마감일"></v-text-field>
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
        mgr: this.mgr,
        progress: this.progress,
        deadline: this.deadline,
      }
    }
  },
}
</script>
  