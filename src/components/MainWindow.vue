<template>
  <section class="section">
    <MenuBar :showSidebar.sync="showSidebar" :showEditor.sync="showEditor" :showPreview.sync="showPreview"/>
    <div class="columns"
      v-shortkey.once="{docs:['ctrl', '1'], editor:['ctrl', '2'], preview:['ctrl', '3']}" @shortkey="toggleView"
      role="main"
    >
      <div class="column is-narrow" v-if="showSidebar">
        <Sidebar/>
      </div>
      <div class="column editor" v-if="showEditor">
        <Editor/>
      </div>
      <div class="column" v-if="showPreview">
        <Preview/>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from './SidebarComponent.vue'
import Editor from './EditorComponent.vue'
import Preview from './PreviewComponent.vue'
import MenuBar from './MenubarComponent.vue'
export default {
  name: 'main-window',
  components: {
    Sidebar,
    MenuBar,
    Editor,
    Preview
  },
  data () {
    return {
      showEditor: true,
      showPreview: this.$localStorage.set('previewModel', true),
      showSidebar: true,
      showFind: false,
      showSettings: false,
      showCreateProject: false,
      findModel: '',
      replaceModel: ''
    }
  },
  // },
  // computed: {
  //   ...mapGetters(['getCount', 'getUpdated', 'findCount', 'findIndex']),
  // },
  // watch: {
  //   findModel () {
  //     if (this.findModel.length === 0) {
  //       this.$store.commit('setFindIndex', 0)
  //     } else {
  //       this.findReplace()
  //     }
  //   }
  // },
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
    processExtra (command) {
      this.$store.commit('alter', command)
    },
    insertExtra (command) {
      this.$store.commit('insertion', command)
    }
  }
}
</script>

<style scoped>
.section {
  padding-top: 10px;
}
.container {
  height: 100%;
}
.editor {
  height: 100%;
}
.sticky {
  font-size: .75rem;
  width:100%;
  height:30px;
  background:hsl(204, 86%, 53%);
  color:white;
  padding: 2px 20px;
  position:fixed;
  bottom:0;
  left:0;
}
</style>
