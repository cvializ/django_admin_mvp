import {
    BehaviorSubject,
    Subject,
    distinctUntilChanged,
    filter
} from '/@perpay-admin/dependencies/rxjs';

export const getStateObservable = (initialState) => {
    const stateSubject$ = new BehaviorSubject(initialState);
    const state$ = stateSubject$.asObservable().pipe(distinctUntilChanged)
    return {
        nextState: (state) => stateSubject$.next(state),
        state$,
    };
}

export const getActionObservable = () => {
    const actionSubject$ = new Subject();
    const action$ = actionSubject$.asObservable();

    return {
        nextAction: (action) => actionSubject$.next(action),
        action$,
    };
}

export const ofType = (outerActionType) => {
    return filter(innerAction => innerAction.type === outerActionType);
};
