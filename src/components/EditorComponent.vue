<template>
  <div class="">
    <div class="flexist field has-addons">
      <div class="control is-expanded">
        <input class="input" type="text" placeholder="Title" @change="updateDocument()" v-model="title" aria-label="document-title"/>
      </div>
      <div class="control">
        <div class="dropdown" :class="{'is-active': showProjects}" v-if="doc">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="showProjects = !showProjects">
              <span>{{projectSelection}}</span>
              <span class="icon is-small">
                <i class="fa fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a class="dropdown-item" v-for="item in projectList" @click="projectSelection = item">
                {{item}}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flexer field">
      <div class="control">
        <textarea
          class="textarea editor"
          v-model="body"
          id="editor"
          rows="20"
          @select="updateCaret"
          @input="updateDocument"
          aria-label="editor"
          v-shortkey.once="{join:['ctrl', 'j'], save:['ctrl', 's'], print:['ctrl', 'p']}" @shortkey="shortcuts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import * as db from '../data/db.js'
import { mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'
export default {
  name: 'editor-component',
  data: () => {
    return {
      projects: [''],
      doc: '',
      title: '',
      projectSelection: '',
      showProjects: false
    }
  },
  computed: {
    ...mapGetters(['selectedDocument', 'projectList']),
    body: {
      get () {
        return this.$store.state.body
      },
      set (value) {
        this.$store.commit('setBody', value)
      }
    }
  },
  mounted () {
    if (this.$localStorage.get('reopenModel', true)) {
      if (this.$localStorage.get('lastDocument', '') !== '') {
        this.setSelectedDocument(this.$localStorage.get('lastDocument', ''))
      }
    }
  },
  watch: {
    selectedDocument: function () {
      this.loadDocument()
      this.loadProjectTitles()
    },
    projectSelection: function () {
      if (this.doc.project) {
        if (this.doc.project !== this.projectSelection) {
          this.updateDocument()
          this.loadProjectTitles()
        }
      }
    }
  },
  methods: {
    ...mapMutations(['setPreviewRequested', 'setBody', 'setCaret', 'setUpdated', 'setSelectedDocument', 'alter']),
    shortcuts (event) {
      switch (event.srcKey) {
        case 'join':
          this.alter('join-lines')
          break
        case 'save':
          this.updateDocument()
          break
        case 'print':
          this.$router.push('/print')
          break
      }
    },
    loadProjectTitles: async function () {
      var database = await db.get()
      database.documents
        .find()
        .exec()
        .then(docs => {
          var pro = _.map(_.uniqBy(docs, 'project'), function (doc) {
            return doc.project
          })
          this.$store.commit('setProjectList', pro)
          // return pro
        })
    },
    updateCaret: _.debounce(
      function () {
        var positionStart = document.getElementById('editor').selectionStart || 0
        var positionEnd = document.getElementById('editor').selectionEnd || 0
        this.setCaret({start: positionStart, end: positionEnd})
      }, 100, {
        maxWait: 500
      }
    ),
    updateDocument: _.debounce(
      function () {
        if (this.doc) {
          this.doc.set('title', this.title)
          if (this.doc.body !== this.body) {
            var date = new Date().toISOString()
            this.setUpdated(date)
            this.doc.set('updated', date)
          }
          this.doc.set('body', this.body)
          this.doc.set('project', this.projectSelection)
          this.doc.save()
          this.setPreviewRequested(true)
          this.setUpdated()

          var positionStart = document.getElementById('editor').selectionStart || 0
          var positionEnd = document.getElementById('editor').selectionEnd || 0
          this.setCaret({start: positionStart, end: positionEnd})
        }
      }, 1000, {
        maxWait: 5000
      }
    ),
    loadDocument: async function () {
      var database = await db.get()
      database.documents
        .findOne()
        .where('created')
        .eq(this.selectedDocument)
        .exec()
        .then(result => {
          this.doc = result
          this.setBody(result.body)
          this.title = result.title
          this.projectSelection = result.project
          this.setUpdated(result.updated)
          this.setPreviewRequested(true)
          this.$localStorage.set('lastDocument', this.selectedDocument)
        })
    }
  }
}
</script>

<style scoped>

.editor {
  height: 100%;
}
</style>
