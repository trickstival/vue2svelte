interface Preset {
  script: string
  template: string
}

const presets: Record<string, Preset> = {
  default: {
    template: `<div>
    <span title="static" v-bind:anything="prop1"></span>
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
  'v-if and v-else': {
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
  'v-for': {
    template: `<div>
    <h2 v-for="nameObj in list">{{ nameObj.name }}</h2>
</div>`,
    script: `{
      data () {
        return {
          list: [{ name: 'Bob' }, { name: 'Dylan' }]
        }
      }
    }`
  },
  'print data': {
    template: `<div>
    <span>Printing prop: {{ prop1 }}</span>
</div>`,
    script: `{
      props: {
        prop1: {
          default: 'yeeah Im a prop'
        }
      }
    }`
  }
}

export default presets
