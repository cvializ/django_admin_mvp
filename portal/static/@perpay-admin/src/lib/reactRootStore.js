import { html } from "/@perpay-admin/dependencies/htm";
import { ReactRootStoreContext } from "/@perpay-admin/src/context/reactRootStore";
import { useContextOrError } from "/@perpay-admin/src/hooks/useContextOrError";
export const createStoreProvider = (Context) => {
    const ReactRootStoreProvider = ({ state, dispatch, children }) => {
        const contextValue = {
            state,
            dispatch,
        };

        return html`
            <${Context.Provider} value=${contextValue}>
                ${children}
            </${Context.Provider}>
        `;
    };

    return ReactRootStoreProvider;
};

export const ReactRootStoreProvider = createStoreProvider(ReactRootStoreContext);

export const getState = (context) => {
    const { state } = useContextOrError(context);
    return state;
}

export const getDispatch = (context) => {
    const { dispatch } = useContextOrError(context);
    return dispatch;
}
