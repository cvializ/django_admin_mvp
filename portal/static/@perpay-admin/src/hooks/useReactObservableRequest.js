import { getActionObservable, getStateObservable } from '/@perpay-admin/src/lib/react-observable';
import { useEffect, useMemo, useRef } from '/@perpay-admin/dependencies/react';
import { defer, merge, mergeAll } from '/@perpay-admin/dependencies/rxjs';
import { useRequest } from '/@perpay-admin/src/hooks/useRequest';

export const useReactObservableRequest = (sideEffects = []) => {
    const { action$, nextAction } = useMemo(() => getActionObservable(), []);
    const { state$, nextState } =  useMemo(() => getStateObservable(), []);
    const dispatchRef = useRef(() => {});

    useEffect(() => {
        const epic$ = defer(() => merge(sideEffects.map((sideEffect) => sideEffect(action$, state$))).pipe(mergeAll()));
        epic$.subscribe((action) => dispatchRef.current(action));
    }, []);

    const middleware = () => store => next => action => {
        const newState = next(action);

        nextState(newState);
        nextAction(action);
    };

    const { dispatch, ...rest } = useRequest([middleware])
    dispatchRef.current = dispatch;

    return {
        dispatch,
        ...rest,
    }
}
