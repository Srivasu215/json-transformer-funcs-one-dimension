# json-transformer-funcs-one-dimension

> One template. Many data objects. A list of JSON element nodes.

[![npm](https://img.shields.io/npm/v/json-transformer-funcs-one-dimension)](https://www.npmjs.com/package/json-transformer-funcs-one-dimension)

---

## Install

```bash
npm install json-transformer-funcs-one-dimension
```

---

## What it does

Takes an array of data objects and a single JSON template.
Applies the template once per item in the array and returns the full array of resolved element nodes.

Internally it is one line:

```javascript
return inSource.map(element => applyTemplate(inTemplate, element));
```

It is the natural upgrade from the primitive: instead of one element, you get a list.

---

## Signature

```javascript
import fromCollection from "json-transformer-funcs-one-dimension";

fromCollection(inSource, inTemplate)
```

| Argument | Type | Description |
| :--- | :--- | :--- |
| `inSource` | non-empty array of plain objects | One object per output element |
| `inTemplate` | object or string | The element shape with `${placeholder}` slots |

**Returns:** an array of resolved element nodes — one per source item.

**Guards (throw on violation):**
- `inSource` must be a non-empty array
- Every item in `inSource` must be a plain object
- `inTemplate` must be an object or string

---

## Examples

### `<col>` width nodes

```javascript
import fromCollection from "json-transformer-funcs-one-dimension";

const columns = [
    { columnName: "itemName", width: "300px" },
    { columnName: "baseUnit", width: "200px" }
];

const template = { "tagName": "col", "attributes": { "width": "${width}" } };

const cols = fromCollection(columns, template);
// [
//   { tagName: "col", attributes: { width: "300px" } },
//   { tagName: "col", attributes: { width: "200px" } }
// ]
```

### `<option>` elements

```javascript
const items = [
    { rowValue: "Cash" },
    { rowValue: "Bank" },
    { rowValue: "Sales" }
];

const template = {
    "tagName": "option",
    "textContent": "${rowValue}",
    "attributes": { "value": "${rowValue}" }
};

const options = fromCollection(items, template);
// [
//   { tagName: "option", textContent: "Cash",  attributes: { value: "Cash"  } },
//   { tagName: "option", textContent: "Bank",  attributes: { value: "Bank"  } },
//   { tagName: "option", textContent: "Sales", attributes: { value: "Sales" } }
// ]
```

`<col>`, `<th>`, `<option>` — all produced by the same function. The only difference is the template and source data.

---

## When to use

Use `fromCollection` when you have **an array of data objects** and want **an array of element nodes** — all shaped by the same template.

For a single element from a single object, use
[`json-transformer-funcs-primitive`](https://www.npmjs.com/package/json-transformer-funcs-primitive).

For a full table grid of rows and cells, use
[`json-transformer-funcs-two-dimensions`](https://www.npmjs.com/package/json-transformer-funcs-two-dimensions).

For the complete story — all three engines working together — see
[`json-transformer-funcs`](https://www.npmjs.com/package/json-transformer-funcs).

---

## License

MIT (c) KeshavSoft
