import applyTemplate from "json-transformer-funcs-primitive";
import guardFunc from "./guard/index.js";

const startFunc = (inSource, inTemplate) => {
    const localSource = inSource;
    const localTemplate = inTemplate;

    guardFunc(localSource, localTemplate);

    return localSource.map(element => {
        // console.log("element---- : ", element);

        return applyTemplate(element, localTemplate)
    });
};

const loopWithIndividualTemplate = (inSource, inTemplate) => {
    const localSource = inSource;
    const localTemplate = inTemplate;

    guardFunc(localSource, localTemplate);

    const newArray = localSource.map(element => {
        return applyTemplate(element, element[inTemplate])
    });
    // console.log("newArray : ", newArray);

    return newArray;
};

export { loopWithIndividualTemplate };
export default startFunc;