import meta from "./meta.js";

const registerGlobal = (inIndividualTemplate, inTemplate) => {
  if (typeof globalThis === "undefined") return;

  globalThis.ks ??= {};
  globalThis.ks.transformer ??= {};
  globalThis.ks.transformer.funcs ??= {};

  globalThis.ks.transformer.funcs.oneDimension = {
    meta,
    individualTemplate: inIndividualTemplate,
    template: inTemplate
  };

  return globalThis.ks.transformer.funcs.oneDimension;
};

export default registerGlobal;