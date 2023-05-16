<template>
  <v-card>
    <v-sheet color="grey lighten-3" class="pt-1 d-flex">
      <v-card-title class="pa-3 pl-7 text-subtitle-1 font-weight-bold">신규 프로젝트 추가</v-card-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-2" color="black" x-small icon fab elevation="0" @click="cancelDialog">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-sheet>

    <v-divider></v-divider>

    <v-card-text class="mt-8">
      <v-form v-model="validate" ref="projectAdd">
        <v-col cols="12" class="pa-0 pt-1" v-for="item in projectForm" :key="item.name">
          <v-col cols="12" class="pa-0 px-3">
            <v-text-field v-if="item.type == 'text'" outlined dense :label="item.label" clearable
              v-model="registData[item.name]" :rules="[v => !!v || `${item.label} 필드는 필수값입니다.`]"></v-text-field>

            <v-textarea v-if="item.type == 'textarea'" outlined dense :label="item.label"
              v-model="registData[item.name]"></v-textarea>

            <v-select v-if="item.type == 'combo'" outlined dense v-model="registData[item.name]"
              :items="comboboxItems[item.name]" :label="item.label" :rules="[v => !!v || `${item.label} 필드는 필수값입니다.`]"
              :return-object="false" item-text="text" item-value="value"></v-select>

            <v-menu v-if="item.type == 'date'" ref="menu" v-model="menu" :close-on-content-click="true"
              transition="scale-transition" offset-y min-width="auto">
              <template v-slot:activator="{ on, attrs }">
                <v-text-field outlined dense v-model="registData[item.name]" :label="item.label"
                  :rules="[v => !!v || `${item.label} 필드는 필수값입니다.`]" append-icon="mdi-calendar" readonly v-bind="attrs"
                  v-on="on"></v-text-field>
              </template>
              <v-date-picker v-model="registData[item.name]" @input="menu = false" no-title :day-format="krDay">
              </v-date-picker>
            </v-menu>
          </v-col>
        </v-col>
      </v-form>
    </v-card-text>


    <v-footer class="pa-5 pt-4">
      <v-col class="pa-0 d-flex justify-end">
        <v-btn type="submit" color="primary" :disabled="disabled = !validate" @click="regist">
          등록</v-btn>
      </v-col>
    </v-footer>
  </v-card>
</template>
    
<script>
import { mapState, mapActions } from 'vuex'
//import View from './layout/View.vue'
export default {
  components: { /*View*/ },
  data() {
    return {
      validate: false,
      disabled: false,
      menu: false,
      modal: false,
      menu2: false,

      projectForm: [
        { name: 'PROJECTNAME', label: '프로젝트명', rules: { required: true }, type: 'text' },
        { name: 'CUSTOMERCODE', label: '고객사', rules: { required: true }, type: 'combo' },
        { name: 'PRODUCTCODE', label: '상품명', rules: { required: true }, type: 'combo' },
        { name: 'FACTORYCODE', label: '공장명', rules: { required: true }, type: 'combo' },
        { name: 'EQUIPMENTCODE', label: '장비명', rules: { required: true }, type: 'combo' },
        { name: 'DUEDATE', label: '완료예정일', rules: { required: true }, type: 'date' },
        { name: 'USERCODE', label: '담당자', rules: { required: true }, type: 'combo' },
        { name: 'DESCRIPTION', label: '비고', rules: { required: false }, type: 'textarea' }
      ],

      registData: {
        PROJECTNAME: null,
        CUSTOMERCODE: null,
        PRODUCTCODE: null,
        FACTORYCODE: null,
        EQUIPMENTCODE: null,
        DUEDATE: null,
        DESCRIPTION: null,
        USERCODE: null
      },

      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      comboboxItems: {},
    }
  },
  created() {
    this.getCombobox()
  },
  mounted() {
    this.comboboxItems.CUSTOMERCODE = this.combobox.customer.map(row => { return { value: row.CUSTOMERCODE, text: row.CUSTOMERNAME } })
    this.comboboxItems.PRODUCTCODE = this.combobox.product.map(row => { return { value: row.PRODUCTCODE, text: row.PRODUCTNAME } })
    this.comboboxItems.FACTORYCODE = this.combobox.factory.map(row => { return { value: row.FACTORYCODE, text: row.FACTORYNAME } })
    this.comboboxItems.EQUIPMENTCODE = this.combobox.equipment.map(row => { return { value: row.EQUIPMENTCODE, text: row.EQUIPMENTNAME } })
    this.comboboxItems.USERCODE = this.combobox.users.map(row => { return { value: row.USERCODE, text: row.USERNAME } })
  },
  computed: {
    ...mapState([
      'combobox'
    ])
  },
  methods: {
    ...mapActions([
      'getCombobox',
      'createProject'
    ]),

    //regist Project
    regist() {
      this.createProject(this.registData).then((result) => {
        this.$emit('create', result.PROJECTNUM)
        this.$refs.projectAdd.reset()
      })
    },

    //exit Dialog
    cancelDialog() {
      this.$emit('cancel')
      this.$refs.projectAdd.reset()
    },
  }

}
</script>
    
<style></style>