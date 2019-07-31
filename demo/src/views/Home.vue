<template>
  <div class="home">
    <h1>Vue2Svelte demo</h1>
    <section class="editors-grid">
      <div>
        Template
        <editor
          v-model="preset.template"
          language="html"
          class="editor"
        />
        Script
        <editor
          v-model="preset.script"
          language="javascript"
          class="editor"
        />
      </div>
      <div class="svelte-result">
        <h2>
          Svelte Result
        </h2>
        <pre class="result-container">
          {{ svelteCode }}
        </pre>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Editor from '@/components/Editor.vue'
import presets from '../utils/presets'
import Compiler from '../../../src'
// import { throttle } from 'lodash-es'
import prettier from 'prettier/standalone'

@Component({
  components: {
    Editor
  }
  // TODO: find a way to run prettier with svelte in the browser
  // watch: {
  //   svelteCode: {
  //     immediate: true,
  //     handler: throttle(function (code) {
  //       fetch(`${process.env.VUE_APP_PROXIED_PRETTIER_SERVICE}/prettify`, {
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json'
  //         },
  //         method: 'POST',
  //         body: JSON.stringify({ code }),

  //       }).then(response => response.json())
  //         .then(data => (this.formattedSvelteCode = data.formattedCode))
  //     }, 1000)
  //   }
  // }
})
export default class Home extends Vue {
  private preset = presets.default
  // private formattedSvelteCode = ''
  get svelteCode () {
    const jsonString = `(${this.preset.script})`.replace(/'/g, '"')
    // eslint-disable
    const component = eval(jsonString)
    component.template = this.preset.template

    const compiler = new Compiler(component)

    return compiler.compile()
  }
}
</script>
<style lang="scss" scoped>
pre.result-container {
  white-space: pre-wrap;
}
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
