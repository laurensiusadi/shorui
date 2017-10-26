import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import VueLocalStorage from 'vue-localstorage'

import Bulma from 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.min.css'
Vue.use(Bulma)

Vue.use(VueLocalStorage, {
  name: 'localStorage'
})

Vue.use(require('vue-shortkey'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
