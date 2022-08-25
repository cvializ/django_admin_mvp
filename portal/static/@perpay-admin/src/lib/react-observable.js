/**
 * This file implements redux-like action$ and state$ observables, and also
 * exposes mechanisms to trigger the next action and state.
 */

import {
    BehaviorSubject,
    Subject,
    distinctUntilChanged,
    Observable,
    from,
    of,
    concat,
} from '/@perpay-admin/dependencies/rxjs';
import {
    catchError,
    filter,
} from '/@perpay-admin/dependencies/rxjs-operators';

export const getStateObservable = (initialState) => {
    const stateSubject$ = new BehaviorSubject(initialState);
    const state$ = stateSubject$.asObservable().pipe(distinctUntilChanged());
    return {
        nextState: (state) => stateSubject$.next(state),
        state$,
    };
};

export const getActionObservable = () => {
    const actionSubject$ = new Subject();
    const action$ = actionSubject$.asObservable();

    return {
        nextAction: (action) => actionSubject$.next(action),
        action$,
    };
};

export const ofType = (outerActionType) => filter(
    (innerAction) => innerAction.type === outerActionType,
);

export const handleError = (cb, source$) => catchError((error) => {
    const result = cb(error);

    let errorAction$;
    if (result instanceof Observable) {
        errorAction$ = result;
    } else {
        errorAction$ = Array.isArray(result) ? from(result) : of(result);
    }

    return concat(errorAction$, source$);
});
