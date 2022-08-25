import { useEffect, useRef } from '/@perpay-admin/dependencies/react';

import { useInitialValue } from '/@perpay-admin/src/hooks/useInitialValue';
import { useRunOnce } from '/@perpay-admin/src/hooks/useRunOnce';
import { useInstanceIdentifier } from '/@perpay-admin/src/hooks/useInstanceIdentifier';
import { getClassNames, stylesheetFromTemplate, scopeStyleSheet } from '/@perpay-admin/src/lib/stylesheet';
import { useConstCallback } from '/@perpay-admin/src/hooks/useConstCallback';

export const useStyles = (scope, css) => {
    const classMappingRef = useRef({});
    const wrapperRef = useRef(null);
    const initialScope = useInitialValue(scope);
    const uniqueId = useInstanceIdentifier();

    // const { getSheet, setSheet } = useStyleSheet();

    const doItCb = useConstCallback((innerCss, innerInitialScope) => {
        let classNames = [initialScope];

        // new sheet
        const sheet = stylesheetFromTemplate(innerCss);

        // sheet scope
        const newStyle = scopeStyleSheet(
            innerInitialScope,
            `${innerInitialScope}__${uniqueId}`,
            sheet,
        );

        for (let i = 0; i < sheet.cssRules.length; i++) {
            const rule = sheet.cssRules[i];
            classNames = [...classNames, ...getClassNames(rule.selectorText)];
        }

        const uniqueClassNames = [...new Set(classNames)];
        const classMapping = Object.fromEntries(uniqueClassNames.map((c) => {
            const key = c;
            const value = c === innerInitialScope ? `${c} ${c}__${uniqueId}` : c;

            return [key, value];
        }));

        classMappingRef.current = classMapping;

        // sheet.commit();
        // commit changes
        wrapperRef.current.innerHTML = '';
        wrapperRef.current.appendChild(newStyle);
        globalThis.document.body.appendChild(wrapperRef.current);
    });

    useRunOnce(() => {
        wrapperRef.current = globalThis.document.createElement('div');
        doItCb(css, initialScope);
    });

    useEffect(() => {
        if (!wrapperRef.current) {
            wrapperRef.current = globalThis.document.createElement('div');
        }
        const wrapper = wrapperRef.current;

        doItCb(css, initialScope);

        return () => globalThis.document.body.removeChild(wrapper);
    }, [css, initialScope, doItCb]);

    return {
        styles: classMappingRef.current,
    };
};
