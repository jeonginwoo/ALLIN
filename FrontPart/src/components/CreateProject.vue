<template>
  <v-card>
    <v-card-title>프로젝트 생성</v-card-title>
    <v-divider></v-divider>
    <v-card-text class="pa-10" style="height: 320px;">
      <v-text-field v-model="createData.Pname" label="프로젝트 이름"></v-text-field>
      <v-text-field v-model="createData.mgr" label="담당자(번호)"></v-text-field>
      <br>
      <v-menu ref="deadline_menu" v-model="deadline_menu" :close-on-content-click="false" :return-value.sync="createData.deadline"
        transition="scale-transition" offset-y min-width="290px">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field v-model="createData.deadline" label="마감일" prepend-icon="mdi-calendar" readonly v-bind="attrs"
            v-on="on"></v-text-field>
        </template>
        <v-date-picker v-model="createData.deadline" no-title scrollable>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="deadline_menu = false">Cancel</v-btn>
          <v-btn text color="primary" @click="deadline_search(createData.deadline)">OK</v-btn>
        </v-date-picker>
      </v-menu> </v-card-text>
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
        deadline: new Date().toISOString().substr(0, 10),
      },
      deadline_menu: false,
    }
  },
  methods: {
    deadline_search(v) {
      this.deadline = v;
      this.deadline_menu = false;
      this.$refs.deadline_menu.save(v);
    },
  }
}
</script>
  