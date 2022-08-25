import { useCallback } from '/@perpay-admin/dependencies/react';

// eslint-disable-next-line react-hooks/exhaustive-deps
export const useConstCallback = (cb) => useCallback(cb, []);
