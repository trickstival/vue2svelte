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
        if (ast.static) {
            return ast.text
        }
        return `
            <${ast.tag}>
                ${ast.children.map((astChild) => this.compileNode(astChild)).join('\n')}
            </${ast.tag}>
        `
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
            // console.log(node)
            const compileChildren = (): string => node.children
                .map((child) => this.compileNode(child))
                .join('\n')

            return `
                <${node.tag}>
                    ${ node.children ? compileChildren() : '' }
                </${node.tag}>
            `
        }
    }
}
