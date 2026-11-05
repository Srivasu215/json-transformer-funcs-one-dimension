# json-transformer-funcs-one-dimension

> One element template. Many data objects. A clean, predictable array of resolved JSON element trees.

[![npm version](https://img.shields.io/npm/v/json-transformer-funcs-one-dimension.svg?style=flat-square)](https://www.npmjs.com/package/json-transformer-funcs-one-dimension)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![GitHub Pages](https://img.shields.io/badge/Docs-GitHub%20Pages-success.svg?style=flat-square)](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/)

---

## 🌐 Live Documentation & Interactive Playground

Explore the complete interactive story and live Monaco Editor playgrounds on **[GitHub Pages](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/)**:

1. **[The Story & Architecture](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/)** ([local](./docs/index.html))  
   What the One-Dimensional Collection Engine is, how it fits into the declarative UI rendering pipeline, and the mathematical formula behind it.
2. **[5 Generations of the Playground](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/versions.html)** ([local](./docs/versions.html))  
   Follow the architectural evolution of our full-screen Monaco Editor workspace across 5 milestones:
   - **[v1: Modular Handlers](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/v1/)** ([local](./docs/v1/index.html)) — Individual folders per button (`rakaBtn/`, `templateBtn/`, `buildBtn/`) attaching imperative `addEventListener` hooks.
   - **[v2: Instruction Bindings](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/v2/)** ([local](./docs/v2/index.html)) — Disappeared all button folders! Introduced `bindings.json` and `actions.js` with a central container event delegation loop.
   - **[v3: CDN Delegation (v4)](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/v3/)** ([local](./docs/v3/index.html)) — Vanished the local loop! Consumes `bindEvents` directly from the `dom-primitive-bindings` CDN build (`dist/v4/min.js`).
   - **[v4: CDN Delegation (v5)](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/v4/)** ([local](./docs/v4/index.html)) — Upgraded to the hardened `dist/v5/min.js` CDN distribution.
   - **[v5: Production Current](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/v5/)** ([local](./docs/v5/index.html)) — Full production playground with Monaco Editor, synchronized JSON models, and zero wiring boilerplate.
3. **[Architecture Guide](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/architecture.html)** ([local](./docs/architecture.html))  
   Deep dive into linear collection template mapping and boundary responsibilities.

---

## 🎯 The Philosophy: Where This Engine Fits

The **KeshavSoft JSON Transformer** family provides a 3-tier declarative architecture for generating DOM representations from JSON:

```text
┌──────────────────────────────────────┐
│  json-transformer-funcs-primitive    │ ◄── Engine 1 (0D): Transforms 1 object into 1 element
└──────────────────┬───────────────────┘
                   │ applyTemplate(template, object)
                   ▼
┌──────────────────────────────────────┐
│ json-transformer-funcs-one-dimension │ ◄── Engine 2 (1D - THIS REPO): 
│   (fromCollection / 1D Engine)       │     Maps 1 template over an ARRAY of objects
└──────────────────┬───────────────────┘     to generate a list of sibling element nodes
                   │ (e.g. <th>, <col>, <option>)
                   ▼
┌──────────────────────────────────────┐
│ json-transformer-funcs-two-dimensions│ ◄── Engine 3 (2D): Full grid of rows & columns
└──────────────────────────────────────┘     (<tbody> with nested <tr> and <td>)
```

---

## ⚡ The Heart of the Implementation

Takes an array of data objects (`inSource`) and a single element template (`inTemplate`).  
Applies the template once per item and returns the complete array of resolved element nodes:

```javascript
return inSource.map(element => applyTemplate(inTemplate, element));
```

- **Pure function**: Zero side effects, fully deterministic.
- **Preserves length**: `output.length === inSource.length`.
- **Natural upgrade from the primitive**: Instead of a single element node, you receive a linear collection of siblings.

---

## 📦 Install

```bash
npm install json-transformer-funcs-one-dimension
```

---

## 🚀 Signature & Contract

```javascript
import fromCollection from "json-transformer-funcs-one-dimension";

const elements = fromCollection(inSource, inTemplate);
```

| Argument | Type | Description |
| :--- | :--- | :--- |
| `inSource` | `Array<Object>` | Non-empty array of plain objects (one per output element) |
| `inTemplate` | `Object` \| `String` | The element shape with `${placeholder}` substitution slots |

**Returns:** `Array<Object>` — an array of resolved element nodes, one per source item.

### Strict Guards (Throws on violation)
- `inSource` must be a non-empty array.
- Every item in `inSource` must be a plain object.
- `inTemplate` must be an object or string.

---

## 💡 Practical Examples

### 1. Table Headers (`<th>`) from Column Metadata

```javascript
import fromCollection from "json-transformer-funcs-one-dimension";

const columns = [
  { columnName: "itemName" },
  { columnName: "baseUnit" },
  { columnName: "batches" }
];

const template = {
  tagName: "th",
  textContent: "${columnName}"
};

const headers = fromCollection(columns, template);
/*
[
  { tagName: "th", textContent: "itemName" },
  { tagName: "th", textContent: "baseUnit" },
  { tagName: "th", textContent: "batches" }
]
*/
```

### 2. Table Column Specifications (`<col>`)

```javascript
const columns = [
  { columnName: "itemName", width: "300px" },
  { columnName: "baseUnit", width: "200px" }
];

const template = {
  tagName: "col",
  attributes: { width: "${width}" }
};

const cols = fromCollection(columns, template);
/*
[
  { tagName: "col", attributes: { width: "300px" } },
  { tagName: "col", attributes: { width: "200px" } }
]
*/
```

### 3. Dropdown Selection Options (`<option>`)

```javascript
const items = [
  { rowValue: "Cash", label: "Cash Account" },
  { rowValue: "Bank", label: "Bank Account" },
  { rowValue: "Sales", label: "Sales Revenue" }
];

const template = {
  tagName: "option",
  textContent: "${label}",
  attributes: { value: "${rowValue}" }
};

const options = fromCollection(items, template);
/*
[
  { tagName: "option", textContent: "Cash Account",  attributes: { value: "Cash"  } },
  { tagName: "option", textContent: "Bank Account",  attributes: { value: "Bank"  } },
  { tagName: "option", textContent: "Sales Revenue", attributes: { value: "Sales" } }
]
*/
```

`<col>`, `<th>`, `<option>`, `<li>` — all produced by the same pure function. The only difference is the template definition and the incoming data.

---

## 🔗 The JSON Transformer Family

- **0D (Primitive)**: [`json-transformer-funcs-primitive`](https://www.npmjs.com/package/json-transformer-funcs-primitive) — 1 object to 1 element node.
- **1D (Collection - This Repo)**: [`json-transformer-funcs-one-dimension`](https://www.npmjs.com/package/json-transformer-funcs-one-dimension) — Array of objects to a linear list of element nodes.
- **2D (Grid)**: [`json-transformer-funcs-two-dimensions`](https://www.npmjs.com/package/json-transformer-funcs-two-dimensions) — Full matrix grids (rows $\times$ columns).
- **Wiring Layer**: [`dom-primitive-bindings`](https://www.npmjs.com/package/dom-primitive-bindings) — Declarative event delegation powered by `bindings.json`.
- **Suite Orchestrator**: [`json-transformer-funcs`](https://www.npmjs.com/package/json-transformer-funcs) — All engines working together as a unified system.

---

## 📄 License

[MIT](https://opensource.org/licenses/MIT) &copy; KeshavSoft
