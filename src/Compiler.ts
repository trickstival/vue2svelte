import Vue from 'vue'
import { ComponentOptions } from 'vue/types/options'
import SvelteComponent, { SvelteData, SvelteProp } from './SvelteComponent'
import TemplateCompiler from './TemplateCompiler'

export class ComponentCompiler<T extends ComponentOptions<Vue>> {
    private vm: T
    private svelteComponent: SvelteComponent
    constructor (vm: T) {
        this.vm = vm
        this.svelteComponent = new SvelteComponent()
    }

    public compile (): string {
        this.mapProps()
        this.mapData()
        this.svelteComponent.setTemplate(new TemplateCompiler(this.vm).compile())
        return this.svelteComponent.getCode()
    }

    public mapProps () {
        const props = this.vm.props || {}
        for (const [vuePropKey, vueProp = {}] of Object.entries(props)) {
            const svelteProp: SvelteProp = {
                default: vueProp.default,
                name: vuePropKey,
            }
            this.svelteComponent.addProp(svelteProp)
        }
    }

    public mapData () {
        let data = this.vm.data || {}
        data = typeof data === 'function'
            ? data()
            : data

        for (const [vueDataKey, vueData = {}] of Object.entries(data)) {
            const svelteData: SvelteData = {
                initialValue: vueData,
                name: vueDataKey,
            }
            this.svelteComponent.addData(svelteData)
        }
    }
}
