import Vue from 'vue'
import VueRouter from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import CourseSelection from '../views/CourseSelectionPage.vue'
import PageNotFoundPage from '../views/PageNotFoundPage.vue'
import ContactPage from '../views/ContactPage.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage
  },
  {
    path: '/CourseSelection',
    name: 'CourseSelection',
    component: CourseSelection
  },
  {
    path: '/Contact',
    name: 'ContactPage',
    component: ContactPage
  },
  {
    path: '*',
    name: 'PageNotFoundPage',
    component: PageNotFoundPage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
