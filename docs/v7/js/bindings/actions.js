import { models, activateTab, editor } from "../monacoEditor/index.js";
import loopWithIndividualTemplate from "https://keshavsoft.github.io/json-transformer-funcs-one-dimension/dist/v9/min.js";

function setEditorContent(content, filename = "file.json") {
    if (!editor || !window.monaco) return;

    const language = filename.endsWith(".js") ? "javascript" : "json";
    const model = window.monaco.editor.createModel(content, language);
    editor.setModel(model);
};

function renderAstToDom(node) {
    if (!node) return null;
    if (typeof node === "string") return document.createTextNode(node);
    if (typeof node === "number") return document.createTextNode(String(node));

    const el = document.createElement(node.tagName || "div");
    if (node.attributes) {
        for (const [k, v] of Object.entries(node.attributes)) {
            if (v !== undefined) el.setAttribute(k, v);
        }
    }
    if (node.textContent !== undefined) {
        el.textContent = node.textContent;
    }
    if (Array.isArray(node.children)) {
        for (const child of node.children) {
            const childDom = renderAstToDom(child);
            if (childDom) el.appendChild(childDom);
        }
    }
    return el;
}

function mountSpecToStage(spec) {
    const stage = document.getElementById("renderOutput");
    if (!stage) return;

    stage.innerHTML = "";

    if (Array.isArray(spec)) {
        const firstTag = spec[0]?.tagName?.toLowerCase();

        // If elements are table cells (th, td), mount inside a styled table shell
        if (firstTag === "th" || firstTag === "td") {
            const tableWrapper = document.createElement("table");
            tableWrapper.className = "table table-striped table-hover table-bordered shadow-sm bg-white mb-0";
            const thead = document.createElement("thead");
            thead.className = "table-dark";
            const tr = document.createElement("tr");

            spec.forEach(item => {
                const domNode = renderAstToDom(item);
                if (domNode) tr.appendChild(domNode);
            });

            thead.appendChild(tr);
            tableWrapper.appendChild(thead);
            stage.appendChild(tableWrapper);
        } else if (firstTag === "option") {
            const selectWrapper = document.createElement("select");
            selectWrapper.className = "form-select shadow-sm";
            selectWrapper.size = Math.min(Math.max(spec.length, 3), 8);

            spec.forEach(item => {
                const domNode = renderAstToDom(item);
                if (domNode) selectWrapper.appendChild(domNode);
            });
            stage.appendChild(selectWrapper);
        } else {
            const listWrapper = document.createElement("div");
            listWrapper.className = "d-flex flex-wrap gap-2";

            spec.forEach(item => {
                const domNode = renderAstToDom(item);
                if (domNode) listWrapper.appendChild(domNode);
            });
            stage.appendChild(listWrapper);
        }
    } else if (spec && typeof spec === "object") {
        const domNode = renderAstToDom(spec);
        if (domNode) stage.appendChild(domNode);
    }
};

function updateTargetDropdown() {
    const stage = document.getElementById("renderOutput");
    const targetSelect = document.getElementById("targetSelect");
    if (!stage || !targetSelect) return;

    const currentVal = targetSelect.value || "renderOutput";
    const foundIds = new Set(["renderOutput"]);

    targetSelect.innerHTML = `<option value="renderOutput">#renderOutput (Root Stage)</option>`;

    // Only scan within the right-side renderOutput stage, not the whole DOM
    const idNodes = stage.querySelectorAll("[id]");
    idNodes.forEach((node) => {
        const id = node.id;
        if (id && !foundIds.has(id)) {
            foundIds.add(id);
            const opt = document.createElement("option");
            opt.value = id;
            opt.textContent = `#${id} (${node.tagName.toLowerCase()})`;
            targetSelect.appendChild(opt);
        }
    });

    // Retain previous target selection if still present
    if (foundIds.has(currentVal)) {
        targetSelect.value = currentVal;
    } else {
        targetSelect.value = "renderOutput";
    }
};

export const actions = {
    openSystemFilePicker: () => {
        const fileInput = document.getElementById("fileInput");
        if (fileInput) {
            fileInput.value = "";
            fileInput.click();
        }
    },

    // 📄 2. Handle file selection from local system
    handleFileSelection: (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target?.result;
            if (typeof content === "string") {
                setEditorContent(content, file.name);
            }
        };
        reader.readAsText(file);
    },

    // ⚡ 3. Center Render Button: Mount 1D Collection or Container into Target ID & Harvest IDs
    render: () => {
        const stage = document.getElementById("renderOutput");
        if (!stage || !editor) return;

        try {
            const raw = editor.getValue();
            const parsed = JSON.parse(raw);
            console.log("parsed : ", parsed);

            window.ks.jsonToDom.appendToDom({
                jsonSpec: parsed, targetHtmlId: "renderOutput",
                appendPosition: "replace", showLog: false
            });

            // 🎯 Harvest all IDs inside the right render tab and populate the dropdown
            updateTargetDropdown();

        } catch (err) {
            console.error("Render error:", err);
            stage.innerHTML = `
                <div class="alert alert-danger font-monospace small" role="alert">
                    <strong><i class="bi bi-exclamation-triangle me-1"></i>Render Error:</strong>
                    <div class="mt-1">${err.message}</div>
                </div>`;
        }
    },

    loadRaka: async () => {
        const response = await fetch("./columns.json");
        const json = await response.json();

        models.columns.setValue(JSON.stringify(json, null, 2));
        activateTab("tabColumns", models.columns);
    },

    loadTemplate: async () => {
        const response = await fetch("./template.json");
        const json = await response.json();

        models.template.setValue(JSON.stringify(json, null, 2));
        activateTab("tabTemplate", models.template);
    },

    build: () => {
        const columns = JSON.parse(models.columns.getValue());
        const template = JSON.parse(models.template.getValue());

        const spec = loopWithIndividualTemplate(columns, template);
        console.log("Transformed 1D Spec:", spec);

        models.output.setValue(JSON.stringify(spec, null, 2));
        activateTab("tabOutput", models.output);

        // 🎯 Mount rendered 1D collection into the right 50% stage
        mountSpecToStage(spec);
    },

    showTabColumns: () => {
        activateTab("tabColumns", models.columns);
    },

    showTabTemplate: () => {
        activateTab("tabTemplate", models.template);
    },

    showTabOutput: () => {
        activateTab("tabOutput", models.output);
    }
};

export default actions;
