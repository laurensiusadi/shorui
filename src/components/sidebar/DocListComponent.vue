<template>
  <div class="document-main"
    v-on:click="openDocument()"
    >
    <div class="document-handle">
      <div class="icon heighter" :class="{handle: !document.fixed}">
        <i class="fa" :class="[document.fixed ? 'fa-thumb-tack' : 'fa-navicon']"></i>
      </div>
    </div>
    <div class="document-info">
      <div class="is-unselectable item-body">
        <p class="has-text-info is-size-6 doc-title">{{title()}}</p>
        <p class="has-text-grey has-text-weight-light is-size-7">Last updated: {{updated}}</p>
      </div>
    </div>
  </div>
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
    title () {
      return this.document.title === '' ? 'Untitled' : this.document.title
    },
    openDocument () {
      this.$nextTick(() => {
        this.setSelectedDocument(this.document.created)
        this.$store.dispatch('loadDocument')
      })
    }
  }
}
</script>

<style scoped>
.heighter {
  height: 100%;
}
.handle {
  /*cursor: move;*/
}
.item-body {
  cursor: pointer;
}
.doc-title {
  max-width: 15ch;
  word-wrap: break-word;
  word-break: break-all;
}
.document-main {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: flex-start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    -webkit-align-content: stretch;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;
    }

.document-handle {
    padding-right: 5px;
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    -webkit-flex: 0 1 auto;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    }

.document-info {
    -webkit-order: 0;
    -ms-flex-order: 0;
    order: 0;
    -webkit-flex: 1 1 auto;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-align-self: stretch;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    }
</style>
