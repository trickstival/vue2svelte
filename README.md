# Vue2Svelte

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
- [x] Simple props binding
- [x] Simple data properties binding
- [x] v-if statements
- [ ] v-else and v-else-if statements
- [ ] v-for statements
- [ ] v-once statements
- [ ] v-model support
- [ ] v-bind="obj" support
- [ ] Methods
- [ ] Computed properties
- [ ] Mixins
- [ ] Lifecycle hooks
- [ ] Calls to $nextTick
- [ ] Filters
- [ ] Calls to $options

...

Currently it can render simple pure components with props and data.

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

Outputs this svelte code (formatting is still broken):

```svelte

            <script>
                // props
                export let heyProp = 'Im a prop';

                // data
                let hey = 'Im hey data';
            </script>

            <h1>

                <span>
                    super {heyProp}
                </span>

 static {heyProp} {hey}
            </h1>


```

This project is a little bit complex, so if you can help please do it!
