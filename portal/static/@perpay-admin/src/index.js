import '/@perpay-admin/dependencies/react'; // This is imported to meet a react-dom requirement
import { createRoot } from '/@perpay-admin/dependencies/react-dom';
import { html } from '/@perpay-admin/dependencies/htm';
import { App } from '/@perpay-admin/src/components/App';

const root = createRoot(globalThis.document.getElementById('root'));
root.render(html`<${App} />`);
