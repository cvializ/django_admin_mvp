import { useState } from '/@perpay-admin/dependencies/react';
import { html } from '/@perpay-admin/dependencies/htm';

import { ComponentContainer } from '/@perpay-admin/src/components/ComponentContainer';
import { useStyles } from '/@perpay-admin/src/hooks/useStyles';
import { css } from '/@perpay-admin/src/lib/css';

const Header = ({ name }) => html`<h1>${name} List</h1>`;

const Footer = (props) => html`<footer ...${props} />`;

export const App = () => {
    const [color, setColor] = useState('');
    const { styles } = useStyles('app', css`
        h1 {
            color: red;
        }
    `);

    return html`
        <div className="${styles.app}">
            <${Header} name="Color (${color})" />
            <${ComponentContainer} color=${color} />
            <${ComponentContainer} color="rebeccapurple" />
            <input value=${color} onChange=${(e) => setColor(e.target.value)} />
            <${Footer}>footer content over there</${Footer}>
        </div>
    `;
};
