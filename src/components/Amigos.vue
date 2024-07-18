<template>
  <div class="parent-container">
    <div class="profile-container">
      <h2 class="bebas-neue-regular">Lista de Amigos</h2>
      <div v-if="amigos.length > 0" class="lista-amigos">
        <ul>
          <li v-for="(amigo, index) in amigos" :key="index" class="amigo-item">
            <div class="amigo-info">
              <span class="bebas-neue-regular2">{{ amigo.userNameSend }}</span>
              <img @click="toggleOpcoesAmigos(index)" src="../assets/maisOpcoes.png" alt="Opções">
            </div>
            <div v-if="mostrarOpcoesAmigos[index]" class="optionFriendContainer">
              <p class="bebas-neue-regular3" @click="desfazerAmizade(amigo.id, index)">Desfazer amizade <img class="optionsFriend" src="../assets/deleteFriend.png" alt="Desfazer amizade"></p>
              <p class="bebas-neue-regular3">Convidar <img class="optionsFriend" src="../assets/sendInvite.png" alt="Convidar"></p>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>Nenhum amigo adicionado ainda.</p>
      </div>
      <button @click="toggleAdicionarAmigo" class="button1">Adicionar Amigos</button>

      <div v-if="mostrarAdicionarAmigo">
        <form @submit.prevent="adicionarAmigo" class="form-adicionar-amigo">
          <label for="nome">Nome do Amigo:</label>
          <input type="text" id="nome" v-model="novoAmigoNome" required>
          <button type="submit" class="button1">Adicionar</button>
        </form>
      </div>
      <FriendRequests @friend-added="fetchFriends" />
      <router-link to="TicTacToe" class="bebas-neue-regular3" @click="voltarAoJogo">Voltar</router-link>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { db, auth } from '../firebase.js';
import { collection, addDoc, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import FriendRequests from './FriendRequests.vue';

export default {
  components: {
    FriendRequests
  },
  setup() {
    const amigos = ref([]);
    const mostrarAdicionarAmigo = ref(false);
    const mostrarOpcoesAmigos = reactive({});
    const novoAmigoNome = ref('');

    const fetchFriends = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "friends"), where("userNameReceived", "==", user.displayName));
        const querySnapshot = await getDocs(q);
        amigos.value = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        amigos.value.forEach((amigo, index) => {
          mostrarOpcoesAmigos[index] = false;
        });
      }
    };

    const toggleAdicionarAmigo = () => {
      mostrarAdicionarAmigo.value = !mostrarAdicionarAmigo.value;
    };

    const adicionarAmigo = async () => {
      if (novoAmigoNome.value.trim() !== '') {
        const user = auth.currentUser;
        if (user) {
          const qRequests = query(collection(db, "friendRequests"), 
            where("userNameSend", "==", user.displayName), 
            where("userNameReceived", "==", novoAmigoNome.value), 
            where("status", "in", ["enviado", "aceito"]));
          const qFriends = query(collection(db, "friends"),
            where("userNameReceived", "==", novoAmigoNome.value),
            where("userNameSend", "==", user.displayName));
          const [querySnapshotRequests, querySnapshotFriends] = await Promise.all([getDocs(qRequests), getDocs(qFriends)]);
          if (!querySnapshotRequests.empty || !querySnapshotFriends.empty) {
            alert('Pedido de amizade já enviado ou o usuário já é seu amigo.');
            return;
          }
          await addDoc(collection(db, "friendRequests"), {
            userNameSend: user.displayName,
            userNameReceived: novoAmigoNome.value,
            status: "enviado"
          });
          novoAmigoNome.value = '';
          alert('Pedido de amizade enviado!');
        }
      }
    };
    const toggleOpcoesAmigos = (index) => {
      mostrarOpcoesAmigos[index] = !mostrarOpcoesAmigos[index];
    };
    const desfazerAmizade = async (amigoId, index) => {
      await deleteDoc(doc(db, "friends", amigoId));
      amigos.value.splice(index, 1);
      delete mostrarOpcoesAmigos[index];
    };
    fetchFriends();
    return {
      amigos,
      mostrarAdicionarAmigo,
      mostrarOpcoesAmigos,
      novoAmigoNome,
      toggleAdicionarAmigo,
      adicionarAmigo,
      toggleOpcoesAmigos,
      desfazerAmizade,
      fetchFriends
    };
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
.bebas-neue-regular2 {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 25px;
}
.bebas-neue-regular3 {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 19px;
  cursor: pointer;
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
  position: relative;
}
.amigo-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.optionsFriend {
  height: 15px;
}
img {
  height: 20px;
  cursor: pointer;
}

p {
  color: #666;
}

.optionFriendContainer {
  background: white;
  border: 1px solid #ccc;
  padding: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
</style>
