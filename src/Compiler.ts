import { ComponentOptions } from 'vue/types/options'
import Vue from 'vue'
import SvelteComponent, { SvelteProp } from './SvelteComponent'

export class ComponentCompiler<T extends ComponentOptions<Vue>> {
    private vm: T
    private svelteComponent: SvelteComponent
    constructor (vm: T) {
        this.vm = vm
        this.svelteComponent = new SvelteComponent()
    }

    compile (): string {
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
}