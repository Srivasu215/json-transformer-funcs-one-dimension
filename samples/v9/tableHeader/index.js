import loopWithIndividualTemplate from "../../../src/index.js";

import columns from "./columns.json" with { type: "json" };
import template from "./template.json" with { type: "json" };

const spec = loopWithIndividualTemplate(columns, template);

console.log("spec : ", spec);