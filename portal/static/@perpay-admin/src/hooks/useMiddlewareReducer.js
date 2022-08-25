import { useReducer, useCallback } from '/@perpay-admin/dependencies/react';

export const useMiddlewareReducer = (reducer, initialState, middlewares = []) => {
    const [ state, rawDispatch ] = useReducer(reducer, initialState);

    const dispatch = useCallback((action) => {
        const store = {
            getState: () => state,
            dispatch: rawDispatch,
        };

        const next = (action) => {
            // HACK because React updates the reducer async
            const expectedNextState = reducer(state, action);

            rawDispatch(action);
            return expectedNextState;
        };

        middlewares.forEach(middleware => middleware()(store)(next)(action));
    }, []);

    return [state, dispatch];
}
