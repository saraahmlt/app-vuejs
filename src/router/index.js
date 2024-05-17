import { createRouter, createWebHistory } from 'vue-router'
import PageHomeView from '../views/PageHomeView.vue'
import PageAboutView from '../views/PageAboutView.vue'
import LoginView from '../views/LoginView.vue'
import LogoutView from '../views/LogoutView.vue'
import RegisterView from '../views/RegisterView.vue'
import addproduct from '../views/addproduct.vue'
import vueintrouvable from '../views/vueintrouvable.vue'
import editproduct from '../views/editproduct.vue'
import profil from '../views/profil.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      component: vueintrouvable
    },
    {
      path: '/',
      name: 'home',
      component: PageHomeView
    },
    {
      path: '/about',
      name: 'about',
      component: PageAboutView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    
    {
      path: '/create-product',
      name: 'create-product',
      component: addproduct
    },
    {

      path: '/edit-product/:id',
      name: '/edit-product',
      component: editproduct
    },
    {

      path: '/profil',
      name: 'profil',
      component: profil
    }
  ]
})

export default router

