import '/@perpay-admin/dependencies/react'; // This is imported to meet a react-dom requirement
import { createRoot } from '/@perpay-admin/dependencies/react-dom';
import { html } from '/@perpay-admin/dependencies/htm';
import { useState } from '/@perpay-admin/dependencies/react';
import { useStyles } from '/@perpay-admin/src/hooks/useStyles';
import { useConstCallback } from '/@perpay-admin/src/hooks/useConstCallback';
import { css } from '/@perpay-admin/src/lib/css';

export const App = () => {
    const [color, setColor] = useState('');
    const { styles } = useStyles('app', css`
        h1 {
            color: red;
        }
    `);

    const onChangeCb = useConstCallback((e) => setColor(e.target.value));

    return html`
        <div className="${styles.app}">
            <h1>Welcome!</h1>
            <p>This is the color you typed: ${color}</p>
            <input placeholder="Type a color" value=${color} onChange=${onChangeCb} />
        </div>
    `;
};


const root = createRoot(globalThis.document.getElementById('root'));
root.render(html`<${App} />`);
