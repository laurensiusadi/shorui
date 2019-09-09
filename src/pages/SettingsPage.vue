<template>
  <div class="modal" :class="{'is-active': settingsActive}">
    <div class="modal-background" @click="closeSettings()"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <span class="icon">
            <i class="fa fa-gear" aria-hidden="true"></i>
          </span>
          Shorui
        </p>
        <button class="delete" aria-label="close" @click="closeSettings()"></button>
      </header>
      <section class="modal-card-body">
        <div class="content">
          <div class="columns">
            <div class="column is-half">
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
            <div class="column is-half">
              <div class="card">
                <div class="card-content">
                  <div class="media">
                    <div class="media-left">
                      <figure class="image is-48x48">
                        <img src="static/images/android-chrome-192x192.png" alt="Shorui">
                      </figure>
                    </div>
                    <div class="media-content">
                      <p class="title is-4">Dennis Russell</p>
                      <p class="subtitle is-6"><a href="https://twitter.com/burasseru">@burasseru</a></p>
                    </div>
                  </div>
                  <div class="content">
                    Available on <a href="https://github.com/rasserudenisu/shorui">Github</a> under the MIT license.
                  </div>
                </div>
              </div>
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
