export interface SvelteProp {
    name: String
    default: any
}

export default class SvelteComponent {
    private props: SvelteProp[]
    addProp (prop: SvelteProp) {
        this.props.push(prop)
    }
    getCode () {
        const propsCode = this.props
            .map(prop => `export let ${prop.name} = ${prop.default};`)
            .join('\n')

        return `
            <script>
                ${propsCode}
            </script>
        `
    }
}
