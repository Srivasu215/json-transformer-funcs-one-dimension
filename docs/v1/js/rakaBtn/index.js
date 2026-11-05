import { models, activateTab } from "../monacoEditor/index.js";

const clickFunc = async () => {
    const response = await fetch("./columns.json");
    const json = await response.json();

    models.columns.setValue(JSON.stringify(json, null, 2));
    activateTab("tabColumns", models.columns);
};

const startFunc = () => {
    const btn = document.getElementById("rakaBtn");
    if (btn) {
        btn.addEventListener("click", clickFunc);
    }
};

export default startFunc;
export { startFunc };

