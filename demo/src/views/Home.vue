<template>
  <div class="home">
    <h1>Vue2Svelte demo</h1>
    <section class="editors-grid">
      <div>
        Template
        <editor
          v-model="template"
          language="html"
          class="editor"
        />
        Script
        <editor
          v-model="script"
          language="javascript"
          class="editor"
        />
      </div>
      <div class="svelte-result">
        <h2>
          Svelte Result
        </h2>
        <pre>
          {{ svelteCode }}
        </pre>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Editor from '@/components/Editor.vue'
import Compiler from '../../../src'

@Component({
  components: {
    Editor
  }
})
export default class Home extends Vue {
  private template: String = `<div>
  <span v-if="prop1 === 'sup'">never gonna be shown</span>
</div>`
  private script: String = `{
  props: {
    prop1: {
      default: 'yeeah Im a prop'
    }
  },
  data() {
    return {
      data1: 'Just normal data'
    }
  }
}`
  get svelteCode () {
    const jsonString = `(${this.script})`.replace(/'/g, '"')
    // eslint-disable
    const component = eval(jsonString)
    component.template = this.template

    const compiler = new Compiler(component)

    return compiler.compile()
  }
}
</script>
<style lang="scss" scoped>
.home {
  height: 80%;
  margin: 0 30px;
}
.editors-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 80%;
}
</style>
