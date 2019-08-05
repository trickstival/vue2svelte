import Vue, { ComponentOptions, CreateElement } from 'vue';
import { ComponentCompiler } from '../src/Compiler';
import * as fs from 'fs'

const getOutput = (filename: string) => fs.readFileSync(__dirname + `/output/${filename}.svelte`, 'utf-8')
const compile = (options: ComponentOptions<Vue>) => new ComponentCompiler(options).compile()

describe('The Compiler', () => {
    it('Static html rendering', () => {
        const myComponent: ComponentOptions<Vue> = {
            template: '<mark>I am just \n<h2>STATIC</h2></mark>'
        }

        const result = compile(myComponent)
        const expected = getOutput('static')
        expect(result).toBe(expected)
    })
    it('Simple v-if and props compiling', () => {
        const myComponent: ComponentOptions<Vue> = {
            template: `<h1><span v-if="heyProp==='ai'">sup {{ heyProp }}</span> plp {{ heyProp }} {{ hey }}</h1>`,
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
        const expected = getOutput('simple')
        expect(result).toBe(expected)
    })
})