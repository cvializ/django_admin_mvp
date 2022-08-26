/**
 * This file implements redux-like action$ and state$ observables, and also
 * exposes mechanisms to trigger the next action and state.
 */

import {
    BehaviorSubject,
    Subject,
    distinctUntilChanged,
    Observable,
    of,
    concat,
} from '/@perpay-admin/dependencies/rxjs';
import {
    catchError,
    filter,
    mergeAll,
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

export const handleError = (cb) => catchError((error, source$) => {
    const result = cb(error);

    let errorAction$;
    if (result instanceof Observable) {
        errorAction$ = result;
    } else {
        errorAction$ = of(result).pipe(mergeAll());
    }

    return concat(errorAction$, source$);
});
