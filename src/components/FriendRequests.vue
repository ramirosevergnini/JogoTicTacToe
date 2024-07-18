<template>
  <div>
    <h2 class="bebas-neue-regular">Pedidos de Amizade Pendentes</h2>
    <ul>
      <li v-for="request in pendingRequests" :key="request.id">
        <span class="bebas-neue-regular2">{{ request.userNameSend }}</span>
        <img class="opcoesAmizade" @click="acceptRequest(request)" src="../assets/check.png" alt="Aceitar">
        <img class="opcoesAmizade" @click="rejectRequest(request.id)" src="../assets/recuse.png" alt="Recusar">
      </li>
    </ul>
  </div>
</template>

<script>
import { db, auth } from '../firebase.js';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from "firebase/firestore";

export default {
  data() {
    return {
      pendingRequests: []
    }
  },
  async created() {
    this.fetchPendingRequests();
  },
  methods: {
    async fetchPendingRequests() {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, "friendRequests"), where("userNameReceived", "==", user.displayName), where("status", "==", "enviado"));
        const querySnapshot = await getDocs(q);
        this.pendingRequests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      }
    },
    async acceptRequest(request) {
      const user = auth.currentUser;
      const friendData = {
        userNameSend: request.userNameSend,
        userNameReceived: user.displayName
      };

      await updateDoc(doc(db, "friendRequests", request.id), { status: "aceito" });

      await addDoc(collection(db, "friends"), friendData);

      this.fetchPendingRequests();
      this.$emit('friend-added');
    },
    async rejectRequest(id) {
      await updateDoc(doc(db, "friendRequests", id), { status: "recusado" });
      this.fetchPendingRequests();
    }
  }
}
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
  padding: 45px;
}
  .opcoesAmizade {
    margin-top: 5px;
    height: 30px;
    cursor: pointer;
  }
</style>
