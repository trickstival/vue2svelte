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
