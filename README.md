# json-transformer-funcs-one-dimension

One-dimensional linear collection template mapper for `json-transformer-funcs`.

Maps an array of source objects (such as table columns) across a given template to produce a transformed array of elements (such as `<col>` or `<th>` elements).

## Installation

```bash
npm install json-transformer-funcs-one-dimension
```

## Usage

```javascript
import fromCollection from "json-transformer-funcs-one-dimension";

const columns = [
    { columnName: "Name", width: "200px" },
    { columnName: "Age", width: "100px" }
];

const template = {
    tagName: "col",
    attributes: { width: "${width}" }
};

const result = fromCollection(columns, template);
console.log(result);
```

## License

MIT
