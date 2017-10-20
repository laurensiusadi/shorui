<template>
  <div class="modal" :class="{'is-active': newProjectActive}">
    <div class="modal-background" @click="closeModal()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <span class="icon">
            <i class="fa fa-plus" aria-hidden="true"></i>
          </span>
          New Project
        </p>
        <button class="delete" aria-label="close" @click="closeModal()"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Project Title"
                v-model.trim="newProjectTitle"
                aria-label="project-title"
              />
            </div>
            <p class="help is-danger" v-show="invalidTitle">Invalid title.</p>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveProject()">Confirm</button>
        <button class="button" @click="closeModal()">Cancel</button>
      </footer>
    </div>
  </div>
</template>


<script>
import * as db from '../../data/db.js'
export default {
  name: 'proj-page',
  props: ['newProjectActive'],
  data () {
    return {
      newProjectTitle: '',
      invalidTitle: false
    }
  },
  watch: {
    newProjectTitle () {
      if (this.newProjectTitle === '') {
        this.invalidTitle = true
      } else {
        this.invalidTitle = false
      }
    }
  },
  methods: {
    saveProject: async function () {
      if (this.newProjectTitle !== '') {
        var database = await db.get()
        var newDocument = {
          title: 'Untitled',
          created: new Date().toISOString(),
          updated: new Date().toISOString(),
          project: this.newProjectTitle,
          description: '',
          body: ''
        }
        database.documents.insert(newDocument)
        this.$emit('update:newProjectActive', false)
      }
    },
    closeModal () {
      this.$emit('update:newProjectActive', false)
    }
  }
}
</script>

<style scoped>
</style>
