import React from '/@perpay-admin/dependencies/react';
import { createRoot } from '/@perpay-admin/dependencies/react-dom';
import { html } from '/@perpay-admin/dependencies/htm';
import { App } from '/@perpay-admin/src/components/App';

const root = createRoot(document.getElementById('root'));
root.render(html`<${App} />`);
