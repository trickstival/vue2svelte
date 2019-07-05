import { ComponentCompiler } from '../src/index'
import Vue, { ComponentOptions, CreateElement } from 'vue';

describe('The Compiler', () => {
    it('creates a compiler', () => {
        const myComponent: ComponentOptions<Vue> = {
            render (h) {
                return h('div', {
                    class: 'some class'
                }, [
                    h('span', 'hey')
                ])
            },
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
        const svelteCode = compiler.compile()
        console.log(svelteCode)
    })
})