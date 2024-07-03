import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import TicTacToe from '../components/TicTacToe.vue';
import Register from '../components/Register.vue';
import Perfil from '../components/Perfil.vue';
import { auth } from "@/firebase";

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/tictactoe',
    name: 'TicTacToe',
    component: TicTacToe,
    meta: { requiresAuth: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const user = auth.currentUser;
    if (!user) {
      next({ name: 'Login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
