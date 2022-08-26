import { useState } from '/@perpay-admin/dependencies/react';
import { html } from '/@perpay-admin/dependencies/htm';

import { ComponentContainer } from '/@perpay-admin/src/components/ComponentContainer';
import { useStyles } from '/@perpay-admin/src/hooks/useStyles';
import { css } from '/@perpay-admin/src/lib/css';
import { useConstCallback } from '/@perpay-admin/src/hooks/useConstCallback';

const Header = ({ name }) => html`<h1>${name} List</h1>`;

const Footer = (props) => html`<footer ...${props} />`;

export const App = () => {
    const [color, setColor] = useState('red');
    const { styles } = useStyles('app', css`
        h1 {
            color: red;
        }
    `);

    const onChangeCb = useConstCallback((e) => setColor(e.target.value));

    return html`
        <div className="${styles.app}">
            <${Header} name="Welcome!" />
            <p>The color of the component below should be ${color}</p>
            <${ComponentContainer} color=${color} />
            <${ComponentContainer} color="rebeccapurple" />
            <input value=${color} onChange=${onChangeCb} />
            <${Footer}>footer content over there</${Footer}>
        </div>
    `;
};
