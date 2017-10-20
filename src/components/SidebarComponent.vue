<template>
  <aside class="menu">
    <CollapseBase v-for="(project, index) in projects" :key="index" :projectTitle="project[0].project">
      <CollapseItem
        v-for="(document, indexer) in project"
        :key="indexer"
        :document="document"
        class="doccer"
      >
      </CollapseItem>
    </CollapseBase>
  </aside>
</template>

<script>
import * as db from '../data/db.js'
import _ from 'lodash'
import { mapMutations } from 'vuex'
// import Collapse from 'vue-bulma-collapse/src/Collapse.vue'
import CollapseItem from './sidebar/CollapseItem.vue'
import CollapseBase from './sidebar/CollapseBase.vue'
export default {
  name: 'sidebar-component',
  components: {
    CollapseItem,
    CollapseBase
  },
  data: () => {
    return {
      subs: [],
      documents: [],
      projects: []
    }
  },
  mounted: async function () {
    this.loadDocuments()
  },
  beforeDestroy () {
    this.subs.forEach(document => document.unsubscribe())
  },
  methods: {
    ...mapMutations(['setSelectedDocument']),
    openDocument (title) {
      this.$nextTick(() => {
        this.setSelectedDocument(title)
      })
    },
    loadDocuments: async function () {
      var database = await db.get()
      this.subs.push(
        database.documents
          .find()
          .$
          .filter(x => {
            return x != null
          })
          // .map(x => {
          //   console.log('map', x)
          //   return x
          // })
          .subscribe(documents => {
            // this.projects = _.map(documents, (doc) => {
            //   return {'project': doc.project, 'created': doc.created}
            // })
            this.projects = _.groupBy(_.map(documents, function (doc) {
              return {'project': doc.get('project'), 'created': doc.get('created'), 'updated': doc.get('updated'), 'title': doc.get('title')}
            }), 'project')
            // console.log('doc', documents)
            // this.documents = documents
            // this.projects = _.groupBy(documents, 'project')
            // this.$store.commit('setProjectList', _.map(this.projects, 'project'))
          })
      )
    }
  }
}
</script>

<style>
.doccer {
  border-bottom: 1px solid #c6c6c6;
  padding: 4px;
}
.doccer:last-child {
  border-bottom: 0px solid transparent;
}
.doccer:hover {
  filter: grayscale(80%);
}
</style>
