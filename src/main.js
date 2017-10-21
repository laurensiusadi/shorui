import Vue from 'vue'
import App from './App'
import router from './router'
import store from './data/store.js'

import VueLocalStorage from 'vue-localstorage'
Vue.use(VueLocalStorage, {
  name: 'localStorage'
})

Vue.use(require('vue-shortkey'))

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
