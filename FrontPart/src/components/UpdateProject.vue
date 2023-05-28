<template>
  <v-card>
    <v-card-title>프로젝트 수정</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-10" style="height: 300px;">
      <v-text-field v-model="updateDate.mgr" label="담당자"></v-text-field>
      <v-select v-model="updateDate.progress" :items="[1, 2, 3, 4, 5, 6, 7]" label="현 진행 단계"></v-select>
      <br>
      <v-menu ref="deadline_menu" v-model="deadline_menu" :close-on-content-click="false"
        :return-value.sync="updateDate.deadline" transition="scale-transition" offset-y min-width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="updateDate.deadline" label="마감일" prepend-icon="mdi-calendar" readonly v-bind="attrs"
            v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="updateDate.deadline" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="deadline_menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="deadline_search(updateDate.deadline)">OK</v-btn>
        </v-date-picker>
      </v-menu> </v-card-text>
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
        mgr: null,
        progress: null,
        deadline: null,
      },
      deadline_menu: false,
    }
  },
  props: ["preData"],
  methods: {
    setPreData() {
      this.updateDate.mgr = this.preData.mgr;
      this.updateDate.progress = this.preData.progress;
      this.updateDate.deadline = this.preData.deadline;
    },
    deadline_search(v) {
      this.deadline = v;
      this.deadline_menu = false;
      this.$refs.deadline_menu.save(v);
    },
  }
}
</script>
    