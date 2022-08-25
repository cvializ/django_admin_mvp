import React from '/@perpay-admin/dependencies/react';

import htm from '/@perpay-admin/node_modules/htm/dist/htm.module'

export { default } from '/@perpay-admin/node_modules/htm/dist/htm.module';
export * from '/@perpay-admin/node_modules/htm/dist/htm.module';

export const html = htm.bind(React.createElement);
