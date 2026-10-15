import applyTemplate from "json-transformer-funcs-primitive";
import guardFunc from "./guard/index.js";

const startFunc = (inSource, inTemplate) => {
    guardFunc(inSource, inTemplate);

    const localSource = inSource;
    const localTemplate = inTemplate;

    return localSource.map(element => applyTemplate(localTemplate, element));
};

export default startFunc;