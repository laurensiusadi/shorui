<template>
  <a
    v-on:click="openDocument(document.created)"
  >
  <div class="tile is-child doccer">
    <p class="has-text-info is-size-6">{{document.title}}</p>
    <p class="has-text-grey has-text-weight-light is-size-7">Last updated: {{updated}}</p>
  </div>
  </a>
</template>


<script>
import { mapMutations } from 'vuex'
import moment from 'moment'
export default {
  name: 'collapse-item',
  props: {
    document: {
      type: Object
    }
  },
  computed: {
    updated () {
      return moment(this.document.updated).fromNow()
    }
  },
  methods: {
    ...mapMutations(['setSelectedDocument']),
    openDocument () {
      this.$nextTick(() => {
        this.setSelectedDocument(this.document.created)
      })
    }
  }
}
</script>

<style>
</style>
