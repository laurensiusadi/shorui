import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'main-window',
      component: () => import('@/components/MainWindow')
    },
    {
      path: '/print',
      name: 'print-page',
      component: () => import('@/pages/PrintPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
