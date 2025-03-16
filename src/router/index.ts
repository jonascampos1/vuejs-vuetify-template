import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import loginVue from '@/components/login.vue'
import testsVue from '@/views/tests.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    /* {
      path: '/',
      name: 'login',
      component: loginVue
    }, */
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ]
})

export default router
