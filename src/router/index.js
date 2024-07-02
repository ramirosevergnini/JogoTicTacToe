
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import TicTacToe from '../components/TicTacToe.vue';
import Register from '../components/Register.vue';
import Perfil from '../components/Perfil.vue';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/tictactoe',
    name: 'TicTacToe',
    component: TicTacToe
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
