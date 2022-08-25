import { useEffect } from "/@perpay-admin/dependencies/react";

export const useMount = (cb) => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => cb(), []);
}
