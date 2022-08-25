import { useMemo } from '/@perpay-admin/dependencies/react';

export const useInitialValue = (value) => {
    const memoize = (typeof value !== 'function' ? () => value : value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useMemo(memoize, []);
};
