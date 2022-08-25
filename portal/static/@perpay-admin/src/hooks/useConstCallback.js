import { useCallback } from "/@perpay-admin/dependencies/react";

export const useConstCallback = (cb) => useCallback(cb, []);
