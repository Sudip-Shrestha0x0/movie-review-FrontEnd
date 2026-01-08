import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ReviewDetail from '../views/ReviewDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/review/:id',
    name: 'ReviewDetail',
    component: ReviewDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router