<template>
  <div class="card">
    <header class="card-header" @click="toggle()">
      <p class="card-header-title has-text-grey has-text-weight-normal is-size-6">
        {{projectTitle}}
      </p>
      <a href="#" class="card-header-icon" aria-label="more options">
        <span class="icon">
          <i class="fa fa-angle-down" aria-hidden="true"></i>
        </span>
      </a>
    </header>
      <div class="card-content" v-if="selected">
        <div class="tile is-ancestor">
          <div class="tile is-parent is-vertical">
            <slot></slot>
          </div>
        </div>
      </div>
  </div>
</template>


<script>
export default {
  name: 'collapse-base',
  props: ['projectTitle'],
  data: () => {
    return {
      selected: false
    }
  },
  methods: {
    toggle () {
      this.selected = !this.selected
    }
  }
}
</script>

<style>
.card-content {
  padding: 4px 2px;
}
</style>
