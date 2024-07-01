// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import TicTacToe from '../components/TicTacToe.vue';

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
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
