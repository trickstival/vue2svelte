<template>
  <div class="editor-tab">
    <slot />
    <prism-editor v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import PrismEditor from 'vue-prism-editor'

export default {
  model: {
    prop: 'code',
    event: 'change'
  },
  components: {
    PrismEditor
  }
}
</script>

<style lang="scss" scoped>
.editor-tab {
  text-align: left;
}
</style>
