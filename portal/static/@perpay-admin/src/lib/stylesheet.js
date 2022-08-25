import '/@perpay-admin/vendors/sanitizer-polyfill';

// String.prototype.match returns an array if multiple values are found, and null
// if no matches are found. This function normalizes the value to always be an array.
const getMatches = (regex, value) => (value.match(regex) || []);

// This is a not-very-good way of extracting classnames from CSS selector text.
const classNameRegex = /\.[^., \\*@#>\[\]{}]+/g;

export const getClassNames = (ruleText) => {
    const matches = getMatches(classNameRegex, ruleText);
    return matches.map((c) => c.replace('.', ''));
};

const sanitizer = new globalThis.Sanitizer();

export const stylesheetFromTemplate = (css) => {
    // The Sanitizer API is not yet standard, so we polyfill it.
    // Sanitizers help prevent untrusted user data from being rendered into the document
    // and causing cross-site scripting (XSS) vulnerabilities.
    // https://github.com/mozilla/sanitizer-polyfill
    const style = sanitizer.sanitizeFor('style', css);

    // The sheet property on style elements is only populated after the
    // element is inserted into a document. So we must create a temporary
    // document to avoid a flash of styles if we make changes to the
    // stylesheet returned here.
    const tempDoc = document.implementation.createHTMLDocument();
    tempDoc.body.appendChild(style);

    return style.sheet;
};

export const createEmptyStylesheet = () => new CSSStyleSheet();

let rootStyleNode = null;

const getStyleSingleton = (parent = document.body) => {
    if (!rootStyleNode) {
        rootStyleNode = document.createElement('style');
        parent.appendChild(rootStyleNode);
    }

    return rootStyleNode;
};

export const mergeStylesheets = (...sheets) => {
    const style = document.createElement('style');

    for (let i = 0; i < sheets.length; i++) {
        for (let j = 0; j < sheets[i].cssRules.length; j++) {
            style.innerText += sheets[i].cssRules[j].cssText;
        }
    }

    return style;
};

export const scopeStyleSheet = (scope, specifier, sheet) => {
    const newStyle = document.createElement('style');

    for (let i = 0; i < sheet.cssRules.length; i++) {
        const rule = sheet.cssRules[i];

        if (!rule.selectorText.includes(`.${scope}`)) {
            rule.selectorText = `.${specifier} ${rule.selectorText}`;
        } else {
            rule.selectorText = rule.selectorText.replace(`.${scope}`, `.${scope}.${specifier}`);
        }

        newStyle.innerHTML += rule.cssText;
    }

    return newStyle;
};

// A collection of rules. Can be rendered to a style tag
class StyleSheet {
    constructor(sheet) {
        this.rules = [...sheet.cssRules];
    }

    render() {
        const style = document.createElement('style');

        this.rules.forEach((rule) => {
            style.innerText += rule.cssText;
        });

        return style;
    }
}
