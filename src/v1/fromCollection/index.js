import applyTemplate from "json-transformer-funcs-primitive";

const startFunc = (inSource, inTemplate) => {
    const localSource = inSource;
    const localTemplate = inTemplate;

    return localSource.map(element => applyTemplate(localTemplate, element));
};

export default startFunc;
