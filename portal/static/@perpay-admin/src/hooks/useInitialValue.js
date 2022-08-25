import { useMemo } from '/@perpay-admin/dependencies/react';

export const useInitialValue = (value) => {
    const memoize = (typeof value !== 'function' ? () => value : value);
    return useMemo(memoize, []);
};
