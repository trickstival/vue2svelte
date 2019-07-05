import { ComponentOptions } from 'vue/types/options'
import Vue from 'vue'
import SvelteComponent, { SvelteProp, SvelteData } from './SvelteComponent'

export class ComponentCompiler<T extends ComponentOptions<Vue>> {
    private vm: T
    private svelteComponent: SvelteComponent
    constructor (vm: T) {
        this.vm = vm
        this.svelteComponent = new SvelteComponent()
    }

    compile (): string {
        this.mapProps()
        this.mapData()
        this.svelteComponent.parseRenderFunction(this.vm.render)
        return this.svelteComponent.getCode()
    }

    mapProps () {
        const { props } = this.vm
        for (const [vuePropKey, vueProp = {}] of Object.entries(props)) {
            const svelteProp: SvelteProp = {
                name: vuePropKey,
                default: vueProp.default
            }
            this.svelteComponent.addProp(svelteProp)
        }
    }

    mapData () {
        let { data } = this.vm
        data = typeof data === 'function' 
            ? data() 
            : data

        for (const [vueDataKey, vueData = {}] of Object.entries(data)) {
            const svelteData: SvelteData = {
                name: vueDataKey,
                initialValue: vueData
            }
            this.svelteComponent.addData(svelteData)
        }
    }
}