import { useReducer } from '/@perpay-admin/dependencies/react';
import { useConstCallback } from '/@perpay-admin/src/hooks/useConstCallback';

export const useMiddlewareReducer = (reducer, initialState, middlewares = []) => {
    const [state, rawDispatch] = useReducer(reducer, initialState);

    const dispatch = useConstCallback((action) => {
        const store = {
            getState: () => state,
            dispatch: rawDispatch,
        };

        const next = (innerAction) => {
            // HACK because React updates the reducer async
            const expectedNextState = reducer(state, innerAction);

            rawDispatch(innerAction);
            return expectedNextState;
        };

        middlewares.forEach((middleware) => middleware()(store)(next)(action));
    });

    return [state, dispatch];
};
