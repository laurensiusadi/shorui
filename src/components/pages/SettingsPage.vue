<template>
  <div class="modal" :class="{'is-active': settingsActive}">
    <div class="modal-background" @click="closeSettings()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <span class="icon">
            <i class="fa fa-gear" aria-hidden="true"></i>
          </span>
        Settings</p>
        <button class="delete" aria-label="close" @click="closeSettings()"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="previewModel" type="checkbox">
                Show preview on start.
              </label>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <label class="checkbox">
                <input v-model="reopenModel" type="checkbox">
                Open last document on start.
              </label>
            </div>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveSettings()">Confirm</button>
        <button class="button" @click="closeSettings()">Cancel</button>
      </footer>
    </div>
</div>
</template>


<script>
export default {
  name: 'settings-page',
  props: ['settingsActive'],
  data () {
    return {
      previewModel: this.$localStorage.get('previewModel', true),
      reopenModel: this.$localStorage.get('reopenModel', true)
    }
  },
  methods: {
    saveSettings () {
      this.$localStorage.set('previewModel', this.previewModel)
      this.$localStorage.set('reopenModel', this.reopenModel)
      this.$emit('update:settingsActive', false)
    },
    closeSettings () {
      this.$emit('update:settingsActive', false)
    }
  }
}
</script>

<style scoped>
</style>
