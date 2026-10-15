const guardFunc = (inSource, inTemplate) => {
    if (!Array.isArray(inSource)) {
        throw new TypeError("inSource must be an Array");
    }

    if (inSource.length === 0) {
        throw new Error("inSource cannot be empty");
    }

    for (let i = 0; i < inSource.length; i++) {
        if (!inSource[i] || typeof inSource[i] !== "object") {
            throw new TypeError(`inSource[${i}] must be an object`);
        }
    }

    if (!inTemplate || (typeof inTemplate !== "object" && typeof inTemplate !== "string")) {
        throw new TypeError("inTemplate must be an object or string");
    }

    return true;
};

export default guardFunc;
