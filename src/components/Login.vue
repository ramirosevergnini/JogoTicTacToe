<template>
  <div class="container-login">
    <div class="formulario-login">
      <h1 class="bebas-neue-regular">Login</h1>
      <form @submit.prevent="fazerLogin">
        <div class="grupo-input">
          <label for="email">Email</label>
          <input type="text" id="email" v-model="email" />
        </div>
        <div class="grupo-input">
          <label for="senha">Senha</label>
          <input type="password" id="senha" v-model="senha" />
        </div>
        <div class="grupo-input">
          <p>
            Criar uma conta
            <router-link to="/register" class="link-criar-conta">aqui</router-link>
          </p>
        </div>
        <button type="submit" class="botao-login">Entrar</button>
      </form>
    </div>  
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    async fazerLogin() {
      try {
        const credencialUsuario = await signInWithEmailAndPassword(auth, this.email, this.senha);
        const usuario = credencialUsuario.user;
        console.log("Usuário logado:", usuario);
        this.$router.push({ name: "TicTacToe" });
      } catch (error) {
        console.error("Erro ao fazer login:", error.message);
        alert("Credenciais inválidas");
      }
    },
  },
};
</script>

<style scoped>
.bebas-neue-regular {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 35px;
  margin-top: 25px;
}
.container-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.formulario-login {
  background: #000;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  width: 300px;
  text-align: center;
  color: white;
  padding: 20px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
  color: white;
}

.grupo-input {
  margin-bottom: 15px;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 5px;
  color: white;
}

input {
  width: calc(100% - 20px);
  padding: 10px;
  border: 1px solid #444;
  border-radius: 4px;
  font-size: 14px;
  background: #222;
  color: white;
}

input::placeholder {
  color: #888;
}

.botao-login {
  width: 100%;
  padding: 10px;
  background-color: blue;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.botao-login:hover {
  background-color: rgba(0, 0, 255, 0.562);
}

.link-criar-conta {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

.link-criar-conta:hover {
  text-decoration: underline;
}
</style>
