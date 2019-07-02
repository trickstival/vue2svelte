import { ComponentCompiler } from '../src/index'
import Vue from 'vue'

describe('The Compiler', () => {
    it('creates a compiler', () => {
        const myComponent = {
            template: '<h1>Hello World</h1>',
            data () {
                return {
                    hey: 'you'
                }
            }
        }
        const compiler = new ComponentCompiler(myComponent)
        const svelteCode = compiler
    })
})