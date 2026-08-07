# iconium-react

React icon library powered by the [iconium-core](https://github.com/IvandevJaimes/iconium-core) API. Access 5,800+ icons from the [theSVG](https://thesvg.org) registry with a simple `<Icon />` component.

- Built-in caching and automatic resize
- Fallback handling on error
- Tree-shakeable ESM/CJS build with full TypeScript types

---

## Install

```bash
npm install iconium-react
```

Requires `react` and `react-dom` (18+).

---

## Usage

```tsx
import { Icon } from 'iconium-react';

export const App = () => (
  <div>
    <Icon name="react" size={24} />
    <Icon name="node.js" size={32} className="logo" />
  </div>
);
```

### Props

| Prop        | Type           | Default | Description                                     |
|-------------|----------------|---------|-------------------------------------------------|
| `name`      | `string`       | -       | Icon name or alias (`"c++"`, `"vscode"`, `"node.js"`) |
| `size`      | `number`       | `24`    | Width and height in pixels                      |
| `fallback`  | `ReactNode`    | -       | Custom fallback rendered when the icon fails    |
| `className` | `string`       | -       | Class for the wrapper `<span>`                  |
| rest        | `HTMLAttributes<HTMLSpanElement>` | - | Any other span attribute          |

Icons are fetched once per slug and cached in memory (5 min TTL). If a request
fails or the icon doesn't exist, a default fallback SVG is shown unless you
provide your own `fallback`.

---

## Searching icons

Use `searchIcons` to find the right slug when you don't know it:

```tsx
import { searchIcons } from 'iconium-react';

const { results } = await searchIcons('node', 10);
// results[0].name  → "Node.js"
// results[0].slug  → "nodedotjs"
```

---

## License

ISC
