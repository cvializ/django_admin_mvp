import { ReactRootStoreContext } from "/@perpay-admin/src/context/reactRootStore";
import { getDispatch } from "/@perpay-admin/src/lib/reactRootStore";

export const useReactRootStoreDispatch = () => {
    return getDispatch(ReactRootStoreContext);
};
