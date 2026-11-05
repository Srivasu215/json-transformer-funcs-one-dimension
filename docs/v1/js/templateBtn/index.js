import { models, activateTab } from "../monacoEditor/index.js";

const clickFunc = async () => {
    const response = await fetch("./template.json");
    const json = await response.json();

    models.template.setValue(JSON.stringify(json, null, 2));
    activateTab("tabTemplate", models.template);
};

const startFunc = () => {
    const btn = document.getElementById("templateBtn");
    if (btn) {
        btn.addEventListener("click", clickFunc);
    }
};

export default startFunc;
export { startFunc };

