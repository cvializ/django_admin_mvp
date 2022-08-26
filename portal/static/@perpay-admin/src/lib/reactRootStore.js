import htm from "/@perpay-admin/dependencies/htm";
import { ReactRootStoreContext } from "/@perpay-admin/src/context/reactRootStore";
import { useContextOrError } from "/@perpay-admin/src/hooks/useContextOrError";

export const createStoreProvider = (Context) => {
    const ReactRootStoreProvider = ({ state, dispatch, children }) => {
        const contextValue = {
            state,
            dispatch,
        };

        return htm  `
            <${Context.Provider} value=${contextValue}>
                ${children}
            </${Context.Provider}>
        `;
    };

    ReactRootStoreProvider.propTypes = {
        state: PropTypes.any.isRequired,
        dispatch: PropTypes.func.isRequried,
        children: PropTypes.node.isRequired,
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
