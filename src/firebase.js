import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyC-7s3oDFBeGvFx9G71AiJF_pGrJZsPR80",
  authDomain: "tictactoe-1d3bf.firebaseapp.com",
  projectId: "tictactoe-1d3bf",
  storageBucket: "tictactoe-1d3bf.appspot.com",
  messagingSenderId: "386296362114",
  appId: "1:386296362114:web:50a3c0b89ad4c653a9309b",
  measurementId: "G-BME15949PM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app); // Importar o módulo de armazenamento

export { auth, storage };
