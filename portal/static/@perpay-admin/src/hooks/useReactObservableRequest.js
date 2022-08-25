import { getActionObservable, getStateObservable } from '/@perpay-admin/src/lib/react-observable';
import { useMemo } from '/@perpay-admin/dependencies/react';
import { defer, merge, mergeAll } from '/@perpay-admin/dependencies/rxjs';

export const useReactObservableRequest = (sideEffects = []) => {
    const { action$, nextAction } = useMemo(() => getActionObservable(), []);
    const { state$, nextState } =  useMemo(() => getStateObservable(), []);

    const epic$ = useMemo(() => {
        const epic$ = defer(() => merge(sideEffects.map((sideEffect) => sideEffect(action$, state$))).pipe(mergeAll()));
        return epic$;
    }, []);

    const middleware = () => store => next => action => {
        const newState = next(action);

        nextState(newState);
        nextAction(action);
    };

    return {
        epic$,
        epicMiddleware: middleware,
    }
}
