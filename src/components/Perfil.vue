<template>
  <div class="parent-container">
    <div class="profile-container">
      <img :src="imageUrl" alt="Profile Image" class="profile-image">
      <h2>{{ userName }}</h2>
      <button class="button1" @click="editProfile = true">Editar</button>
      
      <div v-if="editProfile" class="edit-section">
        <input type="file" @change="onFileChange" /> <br>
        <input v-model="newUserName" placeholder="Novo Nome" />
        <button class="button1" @click="saveChanges">Salvar</button>
      </div>

      <router-link to="/" class="button">Logout</router-link>
      <router-link to="/tictactoe" class="button">Voltar</router-link>
    </div>
  </div>
</template>

<script>
import defaultImage from '../assets/default-profile.png';

export default {
  data() {
    return {
      imageUrl: defaultImage,
      userName: 'Seu Nome',
      newImageUrl: '',
      newUserName: '',
      editProfile: false
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.newImageUrl = URL.createObjectURL(file);
    },
    saveChanges() {
      if (this.newImageUrl) {
        this.imageUrl = this.newImageUrl;
      }
      if (this.newUserName) {
        this.userName = this.newUserName;
      }
      this.editProfile = false;
    }
  }
};
</script>

<style scoped>
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
.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
}
.edit-section {
  margin-top: 20px;
}
.button {
  display: block;
  margin: 10px auto;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  width: 262px;
}
.button1{
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
input{
  margin: 10px;
  width: 120px;
}
</style>
