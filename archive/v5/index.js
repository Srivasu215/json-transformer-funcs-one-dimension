import applyTemplate from "json-transformer-funcs-primitive";
import guardFunc from "./guard/index.js";

const startFunc = (inSource, inTemplate) => {
    const localSource = inSource;
    const localTemplate = inTemplate;

    guardFunc(localSource, localTemplate);

    return localSource.map(element => applyTemplate(element, localTemplate));
};

export default startFunc;