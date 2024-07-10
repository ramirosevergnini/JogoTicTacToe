<!-- Profile.vue -->
<template>
  <div class="parent-container">
    <div class="profile-container">
      <h2 class="bebas-neue-regular">Lista de Amigos</h2>

      <!-- Lista de amigos adicionados -->
      <div v-if="amigos.length > 0" class="lista-amigos">
        <ul>
          <li v-for="(amigo, index) in amigos" :key="index" class="amigo-item">
            <span>{{ amigo.nome }}</span>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Nenhum amigo adicionado ainda.</p>
      </div>

      <button @click="toggleAdicionarAmigo" class="button1">Adicionar Amigos</button>

      <div v-if="mostrarAdicionarAmigo">
        <!-- Formulário para adicionar amigos -->
        <form @submit.prevent="adicionarAmigo" class="form-adicionar-amigo">
          <label for="nome">Nome do Amigo:</label>
          <input type="text" id="nome" v-model="novoAmigoNome" required>
          <button type="submit" class="button1">Adicionar</button>
        </form>
      </div>
      <FriendRequests />
    </div>
  </div>
</template>

<script>
import { db, auth } from '../firebase.js';
import { collection, addDoc } from "firebase/firestore";
import FriendRequests from './FriendRequests.vue';

export default {
  components: {
    FriendRequests
  },
  data() {
    return {
      amigos: [], // Array para armazenar os amigos adicionados
      mostrarAdicionarAmigo: false,
      novoAmigoNome: ''
    };
  },
  methods: {
    toggleAdicionarAmigo() {
      this.mostrarAdicionarAmigo = !this.mostrarAdicionarAmigo;
    },
    async adicionarAmigo() {
      if (this.novoAmigoNome.trim() !== '') {
        const user = auth.currentUser;
        if (user) {
          await addDoc(collection(db, "friendRequests"), {
            userNameSend: user.displayName,
            userNameReceived: this.novoAmigoNome,
            status: "enviado"
          });
          this.novoAmigoNome = '';
        }
      }
    }
  }
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
.parent-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.profile-container {
  text-align: center;
  padding: 20px;
  border: 1px solid black;
  width: 550px;
}
.button1 {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  width: 300px; 
  cursor: pointer;
}

.lista-amigos, .lista-pedidos {
  margin-top: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

.amigo-item, .pedido-item {
  margin-bottom: 8px;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s ease;
}

.amigo-item:hover, .pedido-item:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}

p {
  color: #666;
}
</style>
