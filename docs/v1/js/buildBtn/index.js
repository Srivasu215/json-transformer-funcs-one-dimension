import { models, activateTab } from "../monacoEditor/index.js";
import loopWithIndividualTemplate from "../../../../src/index.js";

const clickFunc = async () => {
    // User will write build code here
    const columns = JSON.parse(models.columns.getValue());
    const template = JSON.parse(models.template.getValue());

    const spec = loopWithIndividualTemplate(columns, template);

    console.log("spec : ", spec);
};

const startFunc = () => {
    const btn = document.getElementById("buildBtn");
    if (btn) {
        btn.addEventListener("click", clickFunc);
    }
};

export default startFunc;
export { startFunc };

