import { useMemo } from '/@perpay-admin/dependencies/react';

export const useInitialValue = (value) => useMemo(() => value, []);
