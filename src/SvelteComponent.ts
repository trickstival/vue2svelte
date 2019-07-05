// This is an intermediary entity between vue and svelte

export interface SvelteProp {
    name: string
    default: any
}

export interface SvelteData {
    name: string,
    initialValue: any,

}

export default class SvelteComponent {
    private props: SvelteProp[]
    private data: SvelteData[]
    private template: string

    constructor () {
        this.props = []
        this.data = []
    }
    public setTemplate (template: string) {
        this.template = template
    }
    public addProp (prop: SvelteProp) {
        this.props.push(prop)
    }
    public addData (data: SvelteData) {
        this.data.push(data)
    }
    public getCode () {
        const propsCode = this.props
            .map((prop) => `export let ${prop.name} = '${prop.default}';`)
            .join('\n')

        const dataCode = this.data
            .map((data) => `let ${data.name} = '${data.initialValue}';`)
            .join('\n')

        return `
            <script>
                // props
                ${propsCode}

                // data
                ${dataCode}
            </script>
            ${this.template}
        `
    }
}
