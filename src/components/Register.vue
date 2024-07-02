<template>
  <div class="container-registro">
    <div class="formulario-registro">
      <h1>Registrar</h1>
      <form @submit.prevent="registrar">
        <div class="grupo-input">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="grupo-input">
          <label for="senha">Senha</label>
          <input type="password" id="senha" v-model="senha" />
        </div>
        <button type="submit" class="botao-registro">Registrar</button>
        <div class="grupo-input">
          <p>
            Já tem uma conta?
            <router-link to="/" class="link-login">Login aqui</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { auth } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  name: "Registrar",
  data() {
    return {
      email: "",
      senha: "",
    };
  },
  methods: {
    async registrar() {
      try {
        const credencialUsuario = await createUserWithEmailAndPassword(auth, this.email, this.senha);
        const usuario = credencialUsuario.user;
        console.log("Usuário registrado:", usuario);

        this.$router.push({ name: "TicTacToe" });
      } catch (error) {
        console.error("Erro ao registrar:", error.message);
        alert("Erro ao registrar usuário");
      }
    },
  },
};
</script>

<style scoped>
.container-registro {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom right, blue, purple);
}

.formulario-registro {
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

.botao-registro {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.botao-registro:hover {
  background-color: #0056b3;
}

.link-login {
  color: #007bff;
  text-decoration: none;
  cursor: pointer;
}

.link-login:hover {
  text-decoration: underline;
}
</style>
