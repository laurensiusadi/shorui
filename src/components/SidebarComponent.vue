<template>
  <aside class="menu">
    <div
      v-for="(document, index) in documentList"
      :key="index"
    >
      <DocListComponent
        class="collapse-item"
        :document="document"
        :key="document.created"
        :title="document.created"
      >
      </DocListComponent>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'
import DocListComponent from './sidebar/DocListComponent.vue'
export default {
  name: 'sidebar-component',
  data: () => {
    return {
    }
  },
  components: {
    DocListComponent
  },
  computed: {
    ...mapGetters(['selectedDocument', 'documentList'])
  },
  mounted: async function () {
    this.$store.dispatch('loadProjects')
  }
}
</script>

<style>
.menu {
  position: relative;
  height: 100%;
}
.collapse-item {
  border-bottom: 1px solid #F6F6F6;
  padding: 4px;
}
.collapse-item:last-child {
  border-bottom: 0px solid #F6F6F6;
}
.collapse-item:hover {
  filter: grayscale(80%);
}
</style>
