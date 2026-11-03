import commonTemplate from "../../../src/index.js";

import columns from "./columns.json" with { type: "json" };
import template from "./template.json" with { type: "json" };

const spec = commonTemplate(columns, template);

console.log("spec 1 : ", spec);
// console.log("spec : ", spec);