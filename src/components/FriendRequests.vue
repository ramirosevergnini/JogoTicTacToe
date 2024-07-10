<!-- FriendRequests.vue -->
<template>
  <div>
    <h2>Pedidos de Amizade Pendentes</h2>
    <ul>
      <li v-for="request in pendingRequests" :key="request.id">
        {{ request.userNameSend }} - {{ request.status }}
        <button @click="acceptRequest(request.id)">Aceitar</button>
        <button @click="rejectRequest(request.id)">Recusar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { db, auth } from '../firebase.js';
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";

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
    async acceptRequest(id) {
      await updateDoc(doc(db, "friendRequests", id), { status: "aceito" });
      this.fetchPendingRequests(); // Atualizar a lista após aceitar o pedido
    },
    async rejectRequest(id) {
      await updateDoc(doc(db, "friendRequests", id), { status: "recusado" });
      this.fetchPendingRequests(); // Atualizar a lista após recusar o pedido
    }
  }
}
</script>
