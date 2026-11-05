import initMonaco from "./monacoEditor/index.js";
import initRakaBtn from "./rakaBtn/index.js";
import initTemplateBtn from "./templateBtn/index.js";
import initBuildBtn from "./buildBtn/index.js";

const startFunc = async () => {
    await initMonaco();
    initRakaBtn();
    initTemplateBtn();
    initBuildBtn();
};

startFunc();
