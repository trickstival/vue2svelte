interface Preset {
  script: string
  template: string
}

const presets: Record<string, Preset> = {
  default: {
    template: `<div>
    <span v-if="prop1 === 'sup'">never gonna be shown</span>
    <div v-else-if="data1">data1 shows</div>
    <div v-else>just v-else</div>
</div>`,
    script: `{
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
  },
  default2: {
    template: `<div>
    <span v-if="prop1 === 'sup'">never gonna be shown</span>
</div>`,
    script: `{
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
  }
}

export default presets
