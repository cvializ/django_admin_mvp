import { useEffect, useRef } from '/@perpay-admin/dependencies/react';

import { useInitialValue } from '/@perpay-admin/src/hooks/useInitialValue';
import { useRunOnce } from '/@perpay-admin/src/hooks/useRunOnce';
import { useInstanceIdentifier } from '/@perpay-admin/src/hooks/useInstanceIdentifier';
import { getClassNames, stylesheetFromTemplate, scopeStyleSheet } from '/@perpay-admin/src/lib/stylesheet';

export const useStyles = (scope, css) => {
    const classMappingRef = useRef({});
    const wrapperRef = useRef(null);
    const initialScope = useInitialValue(scope);
    const uniqueId = useInstanceIdentifier();

    // const { getSheet, setSheet } = useStyleSheet();

    const doIt = (css, initialScope) => {
        let classNames = [initialScope];

        // new sheet
        const sheet = stylesheetFromTemplate(css);

        // sheet scope
        const newStyle = scopeStyleSheet(initialScope, `${initialScope}__${uniqueId}`, sheet);

        for (let i = 0; i < sheet.cssRules.length; i++) {
            const rule = sheet.cssRules[i];
            classNames = [...classNames, ...getClassNames(rule.selectorText)];
        }

        const uniqueClassNames = [...new Set(classNames)];
        const classMapping = Object.fromEntries(uniqueClassNames.map((c) => {
            const key = c;
            const value = c === initialScope ? `${c} ${c}__${uniqueId}` : c;

            return [key, value];
        }));

        classMappingRef.current = classMapping;

        // sheet.commit();
        // commit changes
        wrapperRef.current.innerHTML = '';
        wrapperRef.current.appendChild(newStyle);
        document.body.appendChild(wrapperRef.current);
    };

    useRunOnce(() => {
        wrapperRef.current = globalThis.document.createElement('div');
        doIt(css, initialScope);
    });

    useEffect(() => {
        if (!wrapperRef.current) {
            wrapperRef.current = globalThis.document.createElement('div');
        }
        const wrapper = wrapperRef.current;

        doIt(css, initialScope);

        return () => globalThis.document.body.removeChild(wrapper);
    }, [css, initialScope]);

    return {
        styles: classMappingRef.current,
    };
};
