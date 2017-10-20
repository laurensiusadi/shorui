<template>
  <div>
    <div class="content has-text-justified" v-html="this.html"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MarkdownIt from 'markdown-it'
import subscript from 'markdown-it-sub'
import superscript from 'markdown-it-sup'
import footnote from 'markdown-it-footnote'
import abbreviation from 'markdown-it-abbr'
import insert from 'markdown-it-ins'
import deflist from 'markdown-it-deflist'
import tasks from 'markdown-it-task-lists'
import toc from 'markdown-it-toc-and-anchor'
var markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true
})
.use(subscript)
.use(superscript)
.use(deflist)
.use(footnote)
.use(abbreviation)
.use(insert)
.use(tasks)
.use(toc, {
  anchorLink: false
})
export default {
  name: 'editor-component',
  data: () => {
    return {
      html: ''
    }
  },
  computed: {
    ...mapGetters(['previewRequested', 'getBody'])
  },
  created () {
    this.html = markdown.render(this.getBody)
  },
  watch: {
    previewRequested: function () {
      if (this.previewRequested) {
        this.$store.commit('setPreviewRequested', false)
        // this.html = markdown.render(this.body)
      }
    },
    getBody () {
      this.html = markdown.render(this.getBody)
    }
  }
}
</script>

<style scoped>
</style>
