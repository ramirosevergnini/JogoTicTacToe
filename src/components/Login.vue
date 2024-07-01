<!-- src/components/Login.vue -->
<template>
    <div class="login">
      <h1>Login</h1>
      <input type="text" v-model="username" placeholder="Usuário" />
      <input type="password" v-model="password" placeholder="Senha" />
      <button @click="login">Logar</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: ''
      };
    },
    methods: {
      login() {
        if (this.username && this.password) {
          this.$router.push('/tictactoe');
        } else {
          alert('Por favor, preencha todos os campos.');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  input {
    margin: 10px;
    padding: 10px;
    font-size: 1rem;
  }
  button {
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
  }
  </style>
  