import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import LandingPage from '../views/LandingPage.vue'
import CourseSelection from '../views/CourseSelectionPage.vue'


Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/landing',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/CourseSelection',
    name: 'CourseSelection',
    component: CourseSelection
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
