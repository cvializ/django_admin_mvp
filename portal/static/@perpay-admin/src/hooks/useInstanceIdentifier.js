import { useInitialValue } from '/@perpay-admin/src/hooks/useInitialValue';

let id = 0;

// Create a per-component-instance identifier
export const useInstanceIdentifier = () => {
    const idMemo = useInitialValue(() => id++);
    return idMemo;
};
