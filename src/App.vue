<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import * as db from './data/db.js'
import MainWindow from './components/MainWindow'
export default {
  name: 'app',
  components: {
    MainWindow
  },
  mounted: async function () {
    db.demoDocuments()
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
