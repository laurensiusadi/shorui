<template>
  <div class="editor-container">
    <div class="editor-title field has-addons">
      <div class="control is-expanded">
        <input class="input" type="text" placeholder="Title" @change="updateDocument()" v-model="title" aria-label="document-title"/>
      </div>
      <div class="control">
        <a class="button" :class="{'is-info': isPinned}" v-on:click="pinDoc()"><i class="fa fa-thumb-tack" aria-hidden="true"></i></a>
      </div>
    </div>
    <div class="editor">
      <div class="control">
        <textarea
          class="textarea"
          v-model="getBody"
          id="editor"
          @select="updateCaret"
          @input="updateDocument"
          aria-label="editor"
          rows="20"
          v-shortkey.once="{join:['ctrl', 'j'], save:['ctrl', 's'], print:['ctrl', 'p']}" @shortkey="shortcuts"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'
export default {
  name: 'editor-component',
  data: () => {
    return {
    }
  },
  computed: {
    ...mapGetters(['selectedDocument', 'projectList', 'isPinned']),
    getBody: {
      get () {
        return this.$store.getters.getBody
      },
      set (value) {
        this.$store.commit('setBody', value)
      }
    },
    title: {
      get () {
        return this.$store.getters.getDocumentTitle
      },
      set (value) {
        this.$store.commit('setDocumentTitle', value)
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
    getBody () {
      this.updateDocument()
    }
  },
  methods: {
    ...mapMutations(['saveDocument', 'setPreviewRequested', 'setBody', 'setCaret', 'setUpdated', 'setSelectedDocument', 'alter', 'pinDocument']),
    ...mapActions(['loadDocument']),
    pinDoc () {
      this.pinDocument()
    },
    shortcuts (event) {
      switch (event.srcKey) {
        case 'join':
          this.alter('join-lines')
          break
        case 'save':
          this.saveeDocument()
          break
        case 'print':
          this.$router.push('/print')
          break
      }
    },
    updateCaret: _.debounce(
      function () {
        var positionStart = document.getElementById('editor').selectionStart || 0
        var positionEnd = document.getElementById('editor').selectionEnd || 0
        this.setCaret({ start: positionStart, end: positionEnd })
      }, 100, {
        maxWait: 500
      }
    ),
    updateDocument: _.debounce(
      function () {
        var positionStart = document.getElementById('editor').selectionStart || 0
        var positionEnd = document.getElementById('editor').selectionEnd || 0
        this.setCaret({ start: positionStart, end: positionEnd })
        if (this.doc) {
          this.$store.commit('saveDocument')
        }
      }, 100, {
        maxWait: 1000
      }
    )
  }
}
</script>

<style scoped>
.textarea {
  height: 100%;
  width: 100%;
}
</style>
