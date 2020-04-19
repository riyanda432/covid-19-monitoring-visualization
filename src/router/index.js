import Vue from 'vue'
import VueRouter from 'vue-router'
import IndoChart from './../components/IndoChart.vue'
import WorldChart from  './../components/WorldChart.vue'
import News from './../components/News.vue'
import Credits from './../components/Credits.vue'
import Dashboard from './../components/Dashboard.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/world',
    name: 'World',
    component: WorldChart
  },
  {
    path: '/indonesia',
    name: 'Indonesia',
    component: IndoChart
  },
  {
    path: '/credits',
    name: 'Credits',
    component: Credits
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/news',
    name: 'News',
    component: News
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
