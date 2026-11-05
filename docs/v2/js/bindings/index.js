import actions from "./actions.js";
import bindings from "../../bindings.json" with { type: "json" };

export const initBindings = (container = document.body) => {
    // Group instructions by event type (e.g., 'click')
    const eventTypes = [...new Set(bindings.map((b) => b.event))];

    for (const eventType of eventTypes) {
        container.addEventListener(eventType, (event) => {
            for (const binding of bindings) {
                if (binding.event !== eventType) continue;

                const matchElement = event.target.closest(binding.selector);
                if (matchElement) {
                    const actionFn = actions[binding.action];
                    if (typeof actionFn === "function") {
                        actionFn(event, matchElement);
                    }
                    break;
                }
            }
        });
    }
};

export default initBindings;

