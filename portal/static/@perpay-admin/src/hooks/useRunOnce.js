import { useRef } from '/@perpay-admin/dependencies/react';

export const useRunOnce = (cb) => {
    const flagRef = useRef(false);

    if (!flagRef.current) {
        flagRef.current = true;
        cb();
    }
};
