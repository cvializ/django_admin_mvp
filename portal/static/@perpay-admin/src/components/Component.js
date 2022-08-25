import { html } from '/@perpay-admin/dependencies/htm';

import { useStyles } from '/@perpay-admin/src/hooks/useStyles';
import { css } from '/@perpay-admin/src/lib/css';

export const Component = ({
    color,
    data,
    loading,
    errors,
    onClickRequest,
    onClickSuccess,
    onClickError,
    onClickReset,
}) => {
    const { styles } = useStyles('component', css`
        .component {
            border: 1px solid black;
        }

        p {
            color: ${color || 'red'};
        }
    `);

    return html`
        <div className="${styles.component}">
            <p>Hello worlds</p>
            <button onClick=${onClickRequest}>Start request</button>
            <button onClick=${onClickSuccess}>Success request</button>
            <button onClick=${onClickError}>Error request</button>
            <button onClick=${onClickReset}>Reset request</button>
            <p>Loading: ${loading ? 'Loading' : ''}</p>
            <p>Data: ${data}</p>
            <p>Errors: ${errors.message && errors.message[0]}</p>
        </div>
    `;
};
