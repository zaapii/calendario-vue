import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import Calendario from '../views/LegalimCalendario.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/calendario',
    name: 'calendario',
    component: Calendario
  }
]


const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.getters.isAuthenticated) next({ name: 'login' })
  else next()
})

export default router
