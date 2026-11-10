# json-transformer-funcs-one-dimension

> **The Conveyor Belt.** Takes an array of data items on the conveyor and stamps out a continuous stream of resolved JSON AST element nodes.

[![npm version](https://img.shields.io/npm/v/json-transformer-funcs-one-dimension.svg?color=cb3837&logo=npm)](https://www.npmjs.com/package/json-transformer-funcs-one-dimension)
[![Documentation Portal](https://img.shields.io/badge/Docs-GitHub%20Pages-blue.svg)](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/)
[![Monaco Studio v1](https://img.shields.io/badge/Monaco%20Studio-v1%20Live-brightgreen.svg)](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/monaco/v1/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg)]()

---

## 🌐 Quick Links & Interactive Demos

| Resource / Hub | Direct Link | Description |
|---|---|---|
| 📦 **npm Package** | [`npm/json-transformer-funcs-one-dimension`](https://www.npmjs.com/package/json-transformer-funcs-one-dimension) | Official npm registry distribution |
| 📖 **The Story (Documentation)** | [Online Docs Portal](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/) / [`docs/`](./docs/index.html) | Mental model, pipeline architecture & token guides |
| 🕹️ **Monaco Workspaces Hub** | [Monaco Hub](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/monaco/) / [`docs/monaco/`](./docs/monaco/index.html) | Directory of full-screen Monaco Editor studios |
| 🚀 **Modern Monaco Studio v1** | [Launch Studio v1](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/monaco/v1/) / [`docs/monaco/v1/`](./docs/monaco/v1/index.html) | 50/50 Dual-Pane Studio with dynamic target container injection |
| 🏗️ **Architecture Guide** | [Architecture Deep-Dive](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/architecture.html) / [`docs/architecture`](./docs/architecture.html) | Formal mathematical cardinality of 1D linear mapping |
| 📜 **Historical Versions Hub** | [Generations Hub (v1–v9)](https://keshavsoft.github.io/json-transformer-funcs-one-dimension/versions.html) / [`docs/versions`](./docs/versions.html) | Step-by-step evolutionary milestones across 9 versions |

---

## 📖 The Story: The Conveyor Belt

In the **KeshavSoft JSON Transformer** architecture, UI construction is organized by mathematical dimensionality:

```
┌──────────────────────────────────────┐
│  json-transformer-funcs-primitive    │ ◄── 0D (The Atom / The Mold):
│  applyTemplate(inElement, inTemplate)│     Stamps 1 data dictionary into 1 element AST.
└──────────────────┬───────────────────┘
                   │
                   ▼ delegates element-level stamping
┌──────────────────────────────────────┐
│ json-transformer-funcs-one-dimension │ ◄── 1D (The Conveyor Belt - THIS REPO):
│ (startFunc / fromCollection)         │     Places an ARRAY of data items on the belt.
│                                      │     Stamps each sequentially into sibling AST nodes
└──────────────────┬───────────────────┘     (e.g., <th> headers, <col> tags, <option> tags).
                   │
                   ▼
┌──────────────────────────────────────┐
│ json-transformer-funcs-two-dimensions│ ◄── 2D (The Grid / Matrix):
│ (Rows × Columns Cartesian space)     │     Stamps full tables (<tbody> with <tr> and <td>).
└──────────────────────────────────────┘
```

### The Mental Model
1. **The Conveyor Line (`inSource`)**: A linear stream (array) of dynamic data dictionaries moving down the factory belt.
2. **The Stamping Die (`inTemplate`)**: The structural blueprint with `${placeholder}` token slots.
3. **The Emitted Stream (`output`)**: A continuous array of resolved, immutable JSON element nodes (`[ <col>, <col>, ... ]` or `[ <th>, <th>, ... ]`).

```
  [ Data 1 ] ──► [ Data 2 ] ──► [ Data 3 ]   (inSource Array on Conveyor)
       │              │              │
       ▼              ▼              ▼
 ┌──────────┐   ┌──────────┐   ┌──────────┐
 │ The Mold │   │ The Mold │   │ The Mold │  (inTemplate stamped via applyTemplate)
 └──────────┘   └──────────┘   └──────────┘
       │              │              │
       ▼              ▼              ▼
  [ Node 1 ] ─── [ Node 2 ] ─── [ Node 3 ]   (Resolved Sibling AST Array)
```

---

## ⚙️ Two Conveyor Operational Modes

### 1. Uniform Conveyor (`default` / `fromCollection`)
Every item passing down the conveyor is stamped using the **same identical template**:

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
// Returns 3 <th> element nodes
```

### 2. Polymorphic Conveyor (`loopWithIndividualTemplate`)
Each item travelling on the conveyor carries **its own template specification key**, allowing diverse element shapes on a single conveyor pass:

```javascript
import { loopWithIndividualTemplate } from "json-transformer-funcs-one-dimension";

const items = [
  { label: "Search", customMold: { tagName: "input", attributes: { placeholder: "Search..." } } },
  { label: "Submit", customMold: { tagName: "button", textContent: "Submit", attributes: { class: "btn-primary" } } }
];

const elements = loopWithIndividualTemplate(items, "customMold");
// Returns [<input>, <button>] tailored per item
```

---

## 📦 Installation

```bash
npm install json-transformer-funcs-one-dimension
```

### Browser CDN (ES Module)

```html
<script type="module">
  import fromCollection, { loopWithIndividualTemplate } from "https://keshavsoft.github.io/json-transformer-funcs-one-dimension/dist/v9/min.js";
</script>
```

---

## 🚀 API Signature & Contract

```javascript
import fromCollection, { loopWithIndividualTemplate } from "json-transformer-funcs-one-dimension";

// Uniform mapping:
const elements = fromCollection(inSource, inTemplate);

// Polymorphic mapping:
const elements = loopWithIndividualTemplate(inSource, inTemplateKey);
```

### Parameters

| Argument | Type | Description |
| :--- | :--- | :--- |
| `inSource` | `Array<Object>` | Non-empty array of plain objects to pass down the conveyor. |
| `inTemplate` | `Object` \| `String` | The element blueprint with `${placeholder}` substitution slots. |
| `inTemplateKey` | `String` | Property name on each element containing its individual template. |

### Guarantees & Guards
- **Strict Validation**: Throws if `inSource` is not a non-empty Array, or if items are not plain objects.
- **Pure Function**: Zero side effects, complete immutability.
- **Preserves Length**: `output.length === inSource.length`.

---

## 💡 Practical Real-World Examples

### 1. Table Headers (`<th>`)
```javascript
const columns = [
  { columnName: "itemName" },
  { columnName: "baseUnit" },
  { columnName: "batches" }
];

const headers = fromCollection(columns, {
  tagName: "th",
  textContent: "${columnName}"
});
```

### 2. Colgroup Column Tags (`<col>`)
```javascript
const columns = [
  { width: "250px" },
  { width: "120px" },
  { width: "80px" }
];

const cols = fromCollection(columns, {
  tagName: "col",
  attributes: { width: "${width}" }
});
```

### 3. Dropdown Options (`<option>`)
```javascript
const accounts = [
  { id: "A101", label: "Cash Account" },
  { id: "A102", label: "Bank Account" }
];

const options = fromCollection(accounts, {
  tagName: "option",
  textContent: "${label}",
  attributes: { value: "${id}" }
});
```

---

## 🕹️ Modern Monaco Studio v1

Explore the modern **Monaco Studio v1** inside [`docs/monaco/v1/`](./docs/monaco/v1/index.html):
- **50/50 Dual-Pane Split**: Monaco Editor on the left, live interactive DOM stage on the right.
- **Synchronized Models**: Instant tab switching between `base.json`, `columns.json`, `template.json`, and `output.json`.
- **Target Container Dropdown**: Dynamically inject rendered AST elements into `#renderOutput` or specific DOM container IDs.
- **Declarative Actions**: Powered by `dom-primitive-bindings` and `bindings.json`.

---

## 🔗 The JSON Transformer Family

- **0D (The Atom)**: [`json-transformer-funcs-primitive`](https://www.npmjs.com/package/json-transformer-funcs-primitive) — Single object to single element node.
- **1D (The Conveyor - This Repo)**: [`json-transformer-funcs-one-dimension`](https://www.npmjs.com/package/json-transformer-funcs-one-dimension) — Array of objects mapped into a linear stream of sibling element nodes.
- **2D (The Matrix)**: [`json-transformer-funcs-two-dimensions`](https://www.npmjs.com/package/json-transformer-funcs-two-dimensions) — 2D Cartesian grid mapping (rows × columns into tables).
- **Execution Runtime**: [`json-renderers-run-instructions`](https://www.npmjs.com/package/json-renderers-run-instructions) — Universal instruction dispatcher and registry runner.
- **Event Delegation**: [`dom-primitive-bindings`](https://www.npmjs.com/package/dom-primitive-bindings) — Declarative event delegation using `bindings.json`.

---

## 📄 License

MIT &copy; [KeshavSoft](https://github.com/keshavsoft)
