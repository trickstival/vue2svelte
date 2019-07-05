import { Component, VNodeData, VNodeChildren, ComponentOptions, RenderContext } from "vue";
import { Vue } from 'vue/types/vue'

// This is an intermediary entity between vue and svelte

export interface SvelteProp {
    name: String
    default: any
}

export interface SvelteData {
    name: String,
    initialValue: any,
    
}

type ASTChild = VueAST | String

class VueAST {
    private tag: String | Component
    private binding: VNodeData = {}
    private children: ASTChild[]
    constructor (tag: String | Component, binding: VNodeData | String = {}, children: ASTChild[] = []) {
        this.tag = tag
        if (typeof binding === 'string') {
            children.unshift(binding)
        } else {
            binding = binding as VNodeData
        }
        
        this.children = children
    }

    getAttrsString (): String {
        if (!this.binding.props) {
            return ''
        }
        let str = ''
        for (const [key, val] of Object.entries(this.binding.props)) {
            str += `${key}="${val}"`
        }
        return str
    }

    private getChildTemplate (astChild: ASTChild): String {
        if (typeof astChild === 'string') {
            return astChild
        }
        return (astChild as VueAST).getSvelteTemplate()
    }

    getSvelteTemplate (ast: VueAST = this): String {
        return `
            <${ast.tag}${ast.getAttrsString()}>
                ${ast.children.map(this.getChildTemplate).join('\n')}
            </${ast.tag}>
        `
    }
}

type FakeCreateElement = (
    tag: String | Component,
    binding: VNodeData,
    children: VueAST[]
) => VueAST

export default class SvelteComponent {
    private props: SvelteProp[]
    private data: SvelteData[]
    private ast: VueAST

    constructor () {
        this.props = []
        this.data = []
    }
    parseRenderFunction (renderFunc: Function) {
        this.ast = renderFunc((tag: String | Component, binding: VNodeData, children: VueAST[]) => new VueAST(tag, binding, children))
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
            ${this.ast.getSvelteTemplate()}
        `
    }
}
