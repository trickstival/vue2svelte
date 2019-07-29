interface Preset {
  script: string
  template: string
}

const presets: Record<string, Preset> = {
  default: {
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
