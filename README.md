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

Currently it can compile simple pure components with props and data.

This vue component for instance:

```js
{
    template: `<h1><span>super {{ heyProp }}</span> static {{ heyProp }} {{ hey }}</h1>`,
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
```

Outputs this svelte code:

```svelte
<script>
    export let heyProp = 'Im a prop';
    let hey = 'Im hey data';
</script>
<h1>
    <span>super {heyProp}</span>
    static {heyProp} {hey}
</h1>
```

This project is a little bit complex, so if you can help please do it!
