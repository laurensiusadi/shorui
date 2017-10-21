<template>

  <section class="section">
    <div class="container">
      <nav class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="field has-addons">
              <a class="button" :class="{'is-info (': showSidebar}" @click="showSidebar = !showSidebar"> <span class="icon"> <i class="fa fa-toggle-on"></i> </span> </a>
              <a class="button" :class="{'is-info (': showEditor}" @click="showEditor = !showEditor"> <span class="icon"> <i class="fa fa-edit"></i> </span> </a>
              <a class="button" :class="{'is-info (': showPreview}" @click="showPreview = !showPreview"> <span class="icon"> <i class="fa fa-eye"></i> </span> </a>
            </div>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <a class="button" @click="showCreateProject = !showCreateProject"> <span class="icon"> <i class="fa fa-inbox"></i> </span> </a>
              <a class="button" @click="createDocument()"> <span class="icon"> <i class="fa fa-plus"></i> </span> </a>
            </div>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <a class="button" @click="surround('**')"> <span class="icon"> <i class="fa fa-bold"></i> </span> </a>
              <a class="button" @click="surround('*')"> <span class="icon"> <i class="fa fa-italic"></i> </span> </a>
              <a class="button" @click="surround('~~')"> <span class="icon"> <i class="fa fa-strikethrough"></i> </span> </a>
            </div>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <a class="button" @click="showFind = !showFind"> <span class="icon"> <i class="fa fa-search"></i> </span> </a>
            </div>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Insert</span>
                    <span class="icon is-small">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu-insertions" role="menu">
                  <div class="dropdown-content">
                    <a class="dropdown-item" v-on:click="insertExtra('url')">
                      URL
                    </a>
                    <a class="dropdown-item" v-on:click="insertExtra('image')">
                      Image
                    </a>
                    <hr class="dropdown-divider">
                    <a class="dropdown-item" v-on:click="insertExtra('toc')">
                      Table of Contents
                    </a>
                    <a class="dropdown-item" v-on:click="insertExtra('table')">
                      Table
                    </a>
                    <!-- <a class="dropdown-item" v-on:click="insertExtra('texmath')">
                      TexMath
                    </a> -->
                    <hr class="dropdown-divider">
                    <a class="dropdown-item" v-on:click="insertExtra('list')">
                      List
                    </a>
                    <a class="dropdown-item" v-on:click="insertExtra('deflist')">
                      Definition List
                    </a>
                    <a class="dropdown-item" v-on:click="insertExtra('tasklist')">
                      Task List
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Functions</span>
                    <span class="icon is-small">
                      <i class="fa fa-angle-down" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu-functions" role="menu">
                  <div class="dropdown-content">
                    <a class="dropdown-item" v-on:click="processExtra('join-lines')">
                      Join Lines
                    </a>
                    <a class="dropdown-item" v-on:click="processExtra('strip')">
                      Strip Tags
                    </a>
                    <a class="dropdown-item" v-on:click="processExtra('clean')">
                      Cleanup
                    </a>
                    <a class="dropdown-item" v-on:click="processExtra('capitalize')">
                      Capitalize
                    </a>
                    <a class="dropdown-item" v-on:click="processExtra('titleize')">
                      Titleize
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="level-right">
          <!-- <div class="level-item">
            <div class="field has-addons">
              <a class="button is-danger is-outlined" @click="deleteDocument()"><span class="icon"> <i class="fa fa-trash"></i> </span></a>
            </div>
          </div> -->
          <div class="level-item">
            <div class="field has-addons">
              <router-link to="/print" tag="a"><a class="button"><span class="icon"> <i class="fa fa-print"></i> </span></a></router-link>
            </div>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <a class="button" @click="showSettings = !showSettings"><span class="icon"> <i class="fa fa-gear"></i> </span></a>
            </div>
          </div>
        </div>
      </nav>
      <div class="columns"
        v-shortkey.once="{docs:['ctrl', '1'], editor:['ctrl', '2'], preview:['ctrl', '3']}" @shortkey="toggleView"
      >
        <div class="column is-2" v-if="showSidebar">
          <Sidebar/>
        </div>
        <div class="column flex-container" v-if="showEditor">
          <article class="message" v-if="showFind">
            <div class="message-body">
              <div class="flexist field has-addons">
                <div class="control is-expanded">
                  <input class="input" type="text" placeholder="Find" v-model.lazy="findModel"/>
                </div>
                <div class="control">
                  <a class="button is-info" @click="findNext()">
                    Find
                  </a>
                </div>
              </div>
              <div class="flexist field has-addons">
                <div class="control">
                  <a class="button is-info" @click="replaceSelection()">
                    Replace
                  </a>
                </div>
                <div class="control is-expanded">
                  <input class="input" type="text" placeholder="Replace" v-model="replaceModel"/>
                </div>
                <div class="control" @click="replaceAll()">
                  <a class="button is-info">
                    All
                  </a>
                </div>
              </div>
            </div>
          </article>
          <Editor/>
        </div>
        <div class="column " v-if="showPreview">
          <Preview/>
        </div>
      </div>
      <footer class="footer sticky">
        <nav class="level is-info">
          <div class="level-left">
            <div class="level-item">
              <span>Characters: {{stats.chars}}</span>
            </div>
            <div class="level-item">
              <span>Words: {{stats.words}}</span>
            </div>
            <div class="level-item">
              <span>Lines: {{stats.lines}}</span>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <span v-if="this.getUpdated !== ''">Last updated: {{getLastUpdated()}}</span>
            </div>
            <div class="level-item">
              <a class="button is-info is-small" target="_blank" href="https://github.com/rasserudenisu/shorui"> <span class="icon"> <i class="fa fa-github"></i> </span> </a>
            </div>
          </div>
        </nav>
      </footer>
    </div>
    <Settings :settingsActive.sync="showSettings"/>
    <NewProjectModal :newProjectActive.sync="showCreateProject"/>
  </section>
</template>

<script>
import * as db from '../data/db.js'
import Sidebar from './SidebarComponent.vue'
import Editor from './EditorComponent.vue'
import Preview from './PreviewComponent.vue'
import Settings from './pages/SettingsPage.vue'
import NewProjectModal from './pages/NewProjectModal.vue'
import moment from 'moment'
import _ from 'lodash'
import { mapGetters } from 'vuex'
import textics from 'textics'
export default {
  name: 'main-window',
  components: {
    Sidebar,
    NewProjectModal,
    Editor,
    Preview,
    Settings
  },
  data () {
    return {
      showEditor: true,
      showPreview: true,
      showSidebar: true,
      showFind: false,
      showSettings: false,
      showCreateProject: false,
      findModel: '',
      replaceModel: ''
    }
  },
  computed: {
    ...mapGetters(['getCount', 'getUpdated', 'findCount', 'findIndex']),
    stats () {
      return textics(this.$store.getters.getBody)
    }
  },
  watch: {
    findModel () {
      if (this.findModel.length === 0) {
        this.$store.commit('setFindIndex', 0)
      } else {
        this.findReplace()
      }
    }
  },
  methods: {
    toggleView (event) {
      switch (event.srcKey) {
        case 'docs':
          this.showSidebar = !this.showSidebar
          break
        case 'editor':
          this.showEditor = !this.showEditor
          break
        case 'preview':
          this.showPreview = !this.showPreview
          break
      }
    },
    getLastUpdated () {
      return moment(this.getUpdated).fromNow()
      // return moment(this.getUpdated).format('dddd, MMMM Do YYYY, h:mm:ss a')
    },
    createDocument: async function () {
      var database = await db.get()
      var newDocument = {
        title: 'Untitled',
        created: new Date().toISOString(),
        updated: new Date().toISOString(),
        project: 'Inbox',
        description: '',
        body: ''
      }
      database.documents.insert(newDocument)
    },
    insert (value) {
      this.$store.commit('insertBody', value)
    },
    surround (value) {
      this.$store.commit('surroundBody', value)
    },
    processExtra (command) {
      this.$store.commit('alter', command)
    },
    insertExtra (command) {
      this.$store.commit('insertion', command)
    },
    findReplace: _.debounce(
      function () {
        var input = document.getElementById('editor')
        var index = this.$store.getters.body.indexOf(this.findModel, this.findIndex)
        input.setSelectionRange(index, index + this.findModel.length)
        input.focus()
      }, 500, { 'maxWait': 1000 }
    ),
    findNext () {
      var index = this.$store.getters.body.indexOf(this.findModel, this.findIndex)
      if (index >= this.getCount) {
        this.$store.commit('setFindIndex', 0)
      } else {
        this.$store.commit('setFindIndex', index + this.findModel.length)
      }
      this.findReplace()
    },
    replaceSelection () {
      this.$store.commit('replaceSelection', {value: this.replaceModel})
    },
    replaceAll () {
      this.$store.commit('replaceAllInBody', {target: this.findModel, value: this.replaceModel})
    }
    // deleteDocument () {
    //
    // }
  }
}
</script>

<style>
html {
    position: relative;
    min-height: 100%;
}
body {

}
.section {
  padding: 1em;
  margin-bottom: 20px;
}
.flex-container {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: flex-start;
    -webkit-align-content: stretch;
    -ms-flex-line-pack: stretch;
    align-content: stretch;
    -webkit-align-items: stretch;
    -ms-flex-align: stretch;
    align-items: stretch;
    }
.sticky {
  width:100%;
  height:40px;
  background:hsl(204, 86%, 53%);
  color:white;
  padding: 8px 20px;
  position:fixed;
  bottom:0;
  left:0;
}
</style>
