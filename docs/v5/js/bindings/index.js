// import { bindEvents } from "../../../../../dom-primitive-bindings/docs/dist/v5/min.js";
import { bindEvents } from "https://keshavsoft.github.io/dom-primitive-bindings/dist/v5/min.js";

import bindings from "../../bindings.json" with { type: "json" };
import actions from "./actions.js";

export const initBindings = (container = document.body) => {
    bindEvents(container, bindings, actions);
};

export default initBindings;
