import { ReactRootStoreContext } from "/@perpay-admin/src/context/reactRootStore";
import { getState } from "/@perpay-admin/src/lib/reactRootStore";

const identity = x => x;

export const useReactRootStoreSelector = (selectorFn = identity) => {
    const state = getState(ReactRootStoreContext);
    return selectorFn(state);
};
