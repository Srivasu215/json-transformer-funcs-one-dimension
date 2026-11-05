import { bindEvents } from "https://keshavsoft.github.io/dom-primitive-bindings/dist/v4/min.js";
import bindings from "../../bindings.json" with { type: "json" };
import actions from "./actions.js";

export const initBindings = (container = document.body) => {
    const configuredBindings = bindings.map((binding) => ({
        ...binding,
        onExtract: (result, event, matchElement) => {
            actions[binding.action]?.(event, matchElement);
        }
    }));

    bindEvents(container, configuredBindings);
};

export default initBindings;
