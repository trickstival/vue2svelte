// This is an intermediary entity between vue and svelte

export interface SvelteProp {
    name: String
    default: any
}

export interface SvelteData {
    name: String,
    initialValue: any,
    
}

export default class SvelteComponent {
    private props: SvelteProp[]
    private data: SvelteData[]

    constructor () {
        this.props = []
        this.data = []
    }
    addProp (prop: SvelteProp) {
        this.props.push(prop)
    }
    addData (data: SvelteData) {
        this.data.push(data)
    }
    getCode () {
        const propsCode = this.props
            .map(prop => `export let ${prop.name} = ${prop.default};`)
            .join('\n')

        const dataCode = this.data
            .map(data => `let ${data.name} = ${data.initialValue};`)
            .join('\n')

        return `
            <script>
                // props
                ${propsCode}

                // data
                ${dataCode}
            </script>
        `
    }
}
