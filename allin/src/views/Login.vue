<template>
    <v-container fill-height style="max-width:450px">
      <v-layout align-center row wrap>
        <v-flex xs12>
          <v-alert
            dense
            outlined
            :value="isError"
            type="error"
          >
            이메일과 비밀번호를 확인해 주세요.
          </v-alert>
          <v-alert
            dense
            text
            :value="loginSuccess"
            type="success"
          >
            로그인이 완료되었습니다.
          </v-alert>
  
          <v-card>
            <v-toolbar flat color="blue lighten-5">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
  
            <div class="pa-5">
              <v-text-field
                v-model="email"
                label="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                label="password"
              ></v-text-field>
              <v-btn 
                dark
                block 
                large 
                depressed 
                color = "blue darken-3"
                @click="login"
              >로그인</v-btn>
            </div>
          </v-card>
  
        </v-flex>
      </v-layout>
    </v-container>
  </template>
  
  <script>
  export default{
    data() {
      return {
        email: null,
        password: null,
        isError: false,
        loginSuccess: false
      }
    },
    methods:{
      login(){
        /* let selectedUser = null
        this.allUsers.forEach(user => {
          if(user.email === this.email) selectedUser = user
        })
        if(selectedUser === null) (this.isError = true)
        else{
          selectedUser.password !== this.password
          ? (this.isError = true)
          : (this.loginSuccess = true)
        } */
      }
    }
  }
  </script>