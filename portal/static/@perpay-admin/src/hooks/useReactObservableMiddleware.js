import { getActionObservable, getStateObservable } from '../lib/reactObservable';
import { useRef } from '/@perpay-admin/dependencies/react';
import { defer, merge, mergeAll } from '/@perpay-admin/dependencies/rxjs';
import { useInitialValue } from '/@perpay-admin/src/hooks/useInitialValue';
import { useMount } from '/@perpay-admin/src/hooks/useMount';

export const useReactObservableMiddleware = (sideEffects = []) => {
    const { action$, nextAction } = useInitialValue(() => getActionObservable());
    const { state$, nextState } = useInitialValue(() => getStateObservable());
    const dispatchRef = useRef(() => {});

    useMount(() => {
        const epic$ = defer(() => merge(sideEffects.map(
            (sideEffect) => sideEffect(action$, state$),
        )).pipe(mergeAll()));

        epic$.subscribe((action) => dispatchRef.current(action));
    });

    const middleware = (store) => {
        dispatchRef.current = store.dispatch;

        return (next) => (action) => {
            const newState = next(action);
            nextState(newState);
            nextAction(action);
        };
    };

    return middleware;
};
