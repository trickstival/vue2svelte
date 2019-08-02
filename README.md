# Vue2Svelte

[Demo](https://blissful-goldstine-5db493.netlify.com)
[![Demo Image](https://github.com/trickstival/vue2svelte/blob/master/demo/src/assets/demo-print.png?raw=true)](https://blissful-goldstine-5db493.netlify.com)

Still under development and there's still a long way to go :o

## Install

```bash
npm i vue2svelte
# or
yarn add vue2svelte
```

## Main Goal

Get a Vue options object and convert it into a svelte component

Compiler Roadmap:

- [x] Simple HTML elements rendering
- [x] Default props values
- [x] Simple properties declaration
- [x] v-if statements
- [x] v-else and v-else-if statements
- [x] v-for statements
- [ ] v-once statements
- [ ] v-model support
- [x] v-bind:prop / :prop support
- [ ] v-bind="obj" support
- [ ] Methods
- [ ] Computed properties
- [ ] Mixins
- [ ] Lifecycle hooks
- [ ] Calls to $nextTick
- [ ] Filters
- [ ] Calls to $options

...

## Usage

```js
import Vue2Svelte from 'vue2svelte'

const VueComponent = {
    template: `<div><span v-for="item in list">{{ item }}</span></div>`,
    props: {
        list: {
            default: ['item 1', 'item 2']
        }
    },
    data () {
        return {
            hello: 'world'
        }
    }
}

const SvelteComponent = new Vue2Svelte(VueComponent)

console.log(SvelteComponent.compile())
// Output: <script>export let list=["item 1","item 2"];let hello="world";</script><div>{#each list as item}<span>{item}</span>{/each}</div>

```

Currently it can compile simple pure components with props and data.

This project is a little bit complex, so if you can help please do it!
