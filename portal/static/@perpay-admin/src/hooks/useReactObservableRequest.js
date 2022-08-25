import { getActionObservable, getStateObservable } from '/@perpay-admin/src/lib/react-observable';
import { useRef } from '/@perpay-admin/dependencies/react';
import { defer, merge, mergeAll } from '/@perpay-admin/dependencies/rxjs';
import { useRequest } from '/@perpay-admin/src/hooks/useRequest';
import { useInitialValue } from '/@perpay-admin/src/hooks/useInitialValue';
import { useMount } from '/@perpay-admin/src/hooks/useMount';

export const useReactObservableRequest = (sideEffects = []) => {
    const { action$, nextAction } = useInitialValue(() => getActionObservable());
    const { state$, nextState } = useInitialValue(() => getStateObservable());
    const dispatchRef = useRef(() => {});

    useMount(() => {

        const epic$ = defer(() => merge(sideEffects.map(
            (sideEffect) => sideEffect(action$, state$),
        )).pipe(mergeAll()));

        epic$.subscribe((action) => dispatchRef.current(action));
    });

    const middleware = () => (/* store */) => (next) => (action) => {
        const newState = next(action);

        nextState(newState);
        nextAction(action);
    };

    const { dispatch, ...rest } = useRequest([middleware]);
    dispatchRef.current = dispatch;

    return {
        dispatch,
        ...rest,
    };
};
