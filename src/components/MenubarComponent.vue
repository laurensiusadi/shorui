<template>
    <div class="">
      <nav class="level" role="navigation">
        <div class="level-left">
          <div class="level-item">
            <div class="field has-addons">
              <a class="button" :class="{'is-info': showSidebar}" @click="$emit('update:showSidebar', !showSidebar)"> <span class="icon"> <i class="fa fa-toggle-on"></i> </span> </a>
              <a class="button" :class="{'is-info': showEditor}" @click="$emit('update:showEditor', !showEditor)"> <span class="icon"> <i class="fa fa-edit"></i> </span> </a>
              <a class="button" :class="{'is-info': showPreview}" @click="$emit('update:showPreview', !showPreview)"> <span class="icon"> <i class="fa fa-eye"></i> </span> </a>
            </div>
          </div>
          <div class="level-item">
            <div class="field has-addons">
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
          <!-- <div class="level-item">
            <div class="field has-addons">
              <a class="button" @click="showFind = !showFind"> <span class="icon"> <i class="fa fa-search"></i> </span> </a>
            </div>
          </div> -->
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
          <div class="level-item">
            <div class="field has-addons">
              <div class="dropdown is-hoverable is-right">
                <div class="dropdown-trigger">
                  <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span class="icon is-small">
                      <i class="fa fa-gear" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu-insertions" role="menu">
                  <div class="dropdown-content">
                    <a class="dropdown-item"  @click="showSettings = !showSettings">
                      <span class="icon"> <i class="fa fa-gear"></i> </span>Settings
                    </a>
                    <hr class="dropdown-divider">
                    <router-link to="/print">

                      <a class="dropdown-item" >
                        <span class="icon"> <i class="fa fa-print"></i> </span>Print
                      </a>
                    </router-link>
                    <hr class="dropdown-divider">
                    <a class="dropdown-item" v-on:click="deletionModal = !deletionModal">
                      <span class="icon"> <i class="fa fa-trash"></i> </span>Delete Document
                    </a>
                    <hr class="dropdown-divider" v-if="stats">
                    <span class="dropdown-item" v-if="stats">
                      <span class="has-centering has-text-grey has-text-weight-light is-size-7">
                        {{stats.chars}} chars : {{stats.words}} words : {{stats.lines}} lines
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Settings :settingsActive.sync="showSettings"/>
      <div class="modal" :class="{'is-active': deletionModal}">
        <div class="modal-background"></div>
        <div class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Delete Document?</p>
            <button class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            This cannot be undone.
          </section>
          <footer class="modal-card-foot">
            <button class="button is-danger" @click="deletionModal = false, deleteDocument()">Delete</button>
            <button class="button" @click="deletionModal = false">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
</template>

<script>
import Settings from '../pages/SettingsPage.vue'
import textics from 'textics'
export default {
  name: 'menubar-component',
  components: {
    Settings
  },
  props: {
    showEditor: {
      type: Boolean,
      required: true,
      default: true
    },
    showPreview: {
      type: Boolean,
      required: true,
      default: true
    },
    showSidebar: {
      type: Boolean,
      required: true,
      default: true
    }
  },
  data () {
    return {
      showFind: false,
      showSettings: false,
      findModel: '',
      replaceModel: '',
      deletionModal: false
    }
  },
  computed: {
    stats () {
      if (this.$store.getters.getBody) {
        return textics(this.$store.getters.getBody)
      }
      return null
    }
  },
  methods: {
    deleteDocument () {
      this.$store.commit('deleteDocument')
    },
    processExtra (command) {
      this.$store.commit('alter', command)
    },
    insertExtra (command) {
      this.$store.commit('insertion', command)
    },
    createDocument () {
      this.$store.dispatch('newDocument')
    },
    insert (value) {
      this.$store.commit('insertBody', value)
    },
    surround (value) {
      this.$store.commit('surroundBody', value)
    }
  }
  //   findReplace: _.debounce(
  //     function () {
  //       var input = document.getElementById('editor')
  //       var index = this.$store.getters.body.indexOf(this.findModel, this.findIndex)
  //       input.setSelectionRange(index, index + this.findModel.length)
  //       input.focus()
  //     }, 500, { 'maxWait': 1000 }
  //   ),
  //   findNext () {
  //     var index = this.$store.getters.body.indexOf(this.findModel, this.findIndex)
  //     if (index >= this.getCount) {
  //       this.$store.commit('setFindIndex', 0)
  //     } else {
  //       this.$store.commit('setFindIndex', index + this.findModel.length)
  //     }
  //     this.findReplace()
  //   },
  //   replaceSelection () {
  //     this.$store.commit('replaceSelection', {value: this.replaceModel})
  //   },
  //   replaceAll () {
  //     this.$store.commit('replaceAllInBody', {target: this.findModel, value: this.replaceModel})
  //   }
  //   // deleteDocument () {
  //   //
  //   // }
}
</script>

<style>
</style>
