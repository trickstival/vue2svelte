import { ComponentCompiler } from '../src/index'
import Vue from 'vue'

describe('The Compiler', () => {
    it('creates a compiler', () => {
        const myComponent = {
            template: '<h1>Hello World</h1>',
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