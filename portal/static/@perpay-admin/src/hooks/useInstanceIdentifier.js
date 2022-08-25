import { useMemo } from '/@perpay-admin/dependencies/react';

let id = 0;

// Create a per-component-instance identifier
export const useInstanceIdentifier = () => {
    const idMemo = useMemo(() => id++, []);
    return idMemo;
};
