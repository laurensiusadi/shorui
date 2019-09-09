<template>
  <section class="section">
    <div class="container" id="printDiv">
      <div class="content render" id="rendered" v-html="rendered"></div>
    </div>
  </section>
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
// let kt = require('katex')
// var math = require('markdown-it-texmath').use(kt)
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
  .use(tasks, { enabled: true, label: true })
  .use(toc, {
    anchorLink: false
  })
// .use(math)
export default {
  name: 'print-page',
  data: () => {
    return {
      html: ''
    }
  },
  computed: {
    ...mapGetters(['getBody']),
    rendered () {
      return this.html
    }
  },
  created () {
    this.html = markdown.render(this.getBody)
  },
  mounted () {
    this.print()
  },
  watch: {
    getBody () {
      this.html = markdown.render(this.getBody)
    }
  },
  methods: {
    print () {
      window.print()
    }
  }
}
</script>

<style scoped>
.render {
  width: inherit;
  word-break: break-all;
  text-align: justify;
}
</style>
