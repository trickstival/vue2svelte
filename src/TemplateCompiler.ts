import { ComponentOptions } from 'vue'
import * as Compiler from 'vue-template-compiler'
import { Vue } from 'vue/types/vue'

const FromTypes = {
    isASTElement (T: Compiler.ASTNode): T is Compiler.ASTElement {
        return T.type === 1
    },
    isASTExpression (T: Compiler.ASTNode): T is Compiler.ASTExpression {
        return T.type === 2
    },
    isASTText (T: Compiler.ASTNode): T is Compiler.ASTText {
        return T.type === 3
    },
}

export default class TemplateCompiler {
    private rawTemplate: string
    private compiledVueTemplate: Compiler.CompiledResult<Compiler.ErrorWithRange>
    constructor (options: ComponentOptions<Vue>) {
        this.rawTemplate = options.template
        // @ts-ignore
        this.compiledVueTemplate = Compiler.compile(this.rawTemplate, options)
    }
    public compile (ast = this.compiledVueTemplate.ast) {
        const children = ast.children.map((astChild) => this.compileNode(astChild)).join('\n')
        return `<${ast.tag}>${children}</${ast.tag}>`
    }
    private compileAttrs (node: Compiler.ASTElement): string {
        if (!node.attrs) {
            return ''
        }
        return node.attrs.map((attr) => {
            // "dynamic" property is not mapped by vue-template-compiler declaration files.
            // maybe opening an issue is the right thing to do, but I think it's moving to ts anyway.
            // @ts-ignore
            if (attr.dynamic !== undefined) {
                return `${attr.name}={${attr.value}}`
            }
            return `${attr.name}=${attr.value}`
        }).join(' ')
    }
    private compileSurroundings (node: Compiler.ASTElement, template: string) {
        console.log(node)
        // Compile ifs and elses
        if (node.if) {
            const [, ...elses] = node.ifConditions
            const elsesTemplate = elses.map((elseItem) => {
                const block = this.compileNode(elseItem.block)
                if (elseItem.exp) {
                    return `{:else if ${elseItem.exp}} ${block}`
                }
                return `{:else} ${block}`
            }).join('')
            template = `{#if ${node.if}}${template}${elsesTemplate}{/if}`
        }
        // Compile for
        if (node.for) {
            // I think Svelte only supports one iterator
            let alias = node.alias
            if (node.iterator1) {
                alias += `, ${node.iterator1}`
            }
            template = `{#each ${node.for} as ${alias}}${template}{/each}`
        }
        return template
    }
    private compileNode (node: Compiler.ASTNode) {
        if (FromTypes.isASTText(node)) {
            return node.text
        }
        if (FromTypes.isASTExpression(node)) {
            return node.tokens.map((token) => {
                if (typeof token === 'string') {
                    return token
                }
                return `{${token['@binding']}}`
            }).join('')
        }
        if (FromTypes.isASTElement(node)) {
            const compileChildren = (): string => node.children
                .map((child) => this.compileNode(child))
                .join('\n')

            const attrs = this.compileAttrs(node)

            const trailingAttrs = attrs ? ' ' + attrs : ''
            const childrenOrEmpty = node.children ? compileChildren() : ''

            let currentTemplate = `<${node.tag + trailingAttrs}>${childrenOrEmpty}</${node.tag}>`

            currentTemplate = this.compileSurroundings(node, currentTemplate)

            return currentTemplate
        }
    }
}
