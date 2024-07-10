<template>  
  <div class="parent-container">
    <div class="profile-container">
      <img :src="imageUrl" alt="Profile Image" class="profile-image">
      <h2 class="bebas-neue-regular">{{ userName }}</h2>
      <button class="button1" @click="editProfile = true">Editar</button>
      
      <div v-if="editProfile" class="edit-section">
        <input type="file" @change="onFileChange" /> <br>
        <input v-model="newUserName" placeholder="Novo Nome" />
        <button class="button1" @click="saveChanges">Salvar</button>
      </div>

      <router-link to="/" class="button" @click="logout">Logout</router-link>
      <router-link to="/tictactoe" class="button">Voltar</router-link>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { getAuth, onAuthStateChanged, updateProfile, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase';
import defaultImage from '../assets/default-profile.png';

export default {
  data() {
    return {
      imageUrl: defaultImage,
      userName: 'Seu Nome',
      newImageUrl: '',
      newUserName: '',
      editProfile: false,
      user: null
    };
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.newImageUrl = file;
    },
    async saveChanges() {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        let imageUrl = this.imageUrl;

        if (this.newImageUrl) {
          const storage = getStorage();
          const imageRef = storageRef(storage, `profileImages/${user.uid}`);
          await uploadBytes(imageRef, this.newImageUrl);
          imageUrl = await getDownloadURL(imageRef);
        }

        if (this.newUserName) {
          this.userName = this.newUserName;
        }

        await updateProfile(user, {
          displayName: this.userName,
          photoURL: imageUrl
        });

        await setDoc(doc(db, 'users', user.uid), {
          userName: this.userName,
          imageUrl: imageUrl
        });

        this.imageUrl = imageUrl;
        this.editProfile = false;
      } catch (error) {
        console.error("Error updating profile: ", error);
      }
    },
    async fetchUserData() {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.user = user;
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            this.userName = data.userName;
            this.imageUrl = data.imageUrl;
          } else {
            console.log("No such document!");
          }
        } else {
          console.log("User is signed out");
        }
      });
    },
    async logout() {
      const auth = getAuth();
      await signOut(auth);
    }
  },
  mounted() {
    this.fetchUserData();
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
  background-color: blue;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 5px;
  width: 262px;
  transition: all 0.2s;
}
.button:hover {
  background-color: rgb(0, 0, 126);
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
  transition: all 0.2s;
}
.button1:hover{
  background-color: rgb(211, 211, 211);
}
input{
  margin: 10px;
  width: 120px;
}
</style>
