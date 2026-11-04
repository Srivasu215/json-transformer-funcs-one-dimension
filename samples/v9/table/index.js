// import render from "../../../docs/dist/v4/min.js";
// import "https://keshavsoft.github.io/json-to-dom/dist/v42/min.js";

// Single common source of data and columns
// import data from "../common/data.json" with { type: "json" };
// import columns from "../common/columns.json" with { type: "json" };

import definitions from "./definitions.json" with { type: "json" };

const container = document.getElementById("dom-render-container");

const start = () => {
    try {
        // const spec = render({
        //     type: "table.simple",
        //     data,
        //     columns,
        //     options: {
        //         showSerial: true,
        //         showOptions: true
        //     }
        // });

        window.ks.jsonToDom.appendToDom({
            jsonSpec: definitions?.table?.simple?.base,
            targetHtmlId: "dom-render-container",
            options: {},
            classToApply: "",
            appendPosition: "replace",
        });

        console.log("definitions : ", definitions?.table?.simple?.base);

    } catch (err) {
        console.error("Render error:", err);
        container.innerHTML = `<div class="alert alert-danger font-monospace small">${err.message}</div>`;
    }
};

start();
