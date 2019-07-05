import Vue, { ComponentOptions, CreateElement } from 'vue';
import TemplateCompiler from '../src/TemplateCompiler';
import { ComponentCompiler } from '../src/Compiler';

describe('The Compiler', () => {
    it('creates a compiler', () => {
        const myComponent: ComponentOptions<Vue> = {
            template: `<h1><span>eai + {{ heyProp }}</span> galera {{ heyProp }} {{ hey }}</h1>`,
            props: {
                heyProp: {
                    default: 'Im a prop'
                }
            },
            data () {
                return {
                    hey: 'Im hey data'
                }
            }
        }

        const compiler = new ComponentCompiler(myComponent)
        const result = compiler.compile()
        console.log(result)

        // const compiler = new ComponentCompiler(myComponent)
        // const svelteCode = compiler.compile()
        // console.log(svelteCode)
    })
})