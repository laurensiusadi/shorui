import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load (component) {
  return () => import(`@/${component}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-window',
      component: load('components/MainWindow')
    },
    {
      path: '/print',
      name: 'print-page',
      component: load('pages/PrintPage')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
