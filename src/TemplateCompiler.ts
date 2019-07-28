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
        let attrs = ''
        return attrs
    }
    private compileSurroundings (node: Compiler.ASTElement, template: string) {
        if (node.if) {
            return `{#if ${node.if}}${template}{/if}`
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
