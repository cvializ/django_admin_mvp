import { Component } from '/@perpay-admin/src/components/Component';
import { useReactObservableRequest } from '/@perpay-admin/src/hooks/useReactObservableRequest';
import { html } from '/@perpay-admin/dependencies/htm';
import { mergeMap } from '/@perpay-admin/dependencies/rxjs-operators';
import { handleError, ofType } from '/@perpay-admin/src/lib/react-observable';
import { useCallback, useEffect } from '/@perpay-admin/dependencies/react';
import { useRequest } from '/@perpay-admin/src/hooks/useRequest';
import { switchMap } from '/@perpay-admin/dependencies/rxjs';

export const ComponentContainer = ({ ...rest }) => {
    const epic = (action$) =>
        action$.pipe(
            ofType(dataRequest().type),
            switchMap(() => fetch('./index.html').then(response => response.text())),
            mergeMap((x) => [dataSuccess({ foo: x })]),
            handleError((error) => [dataError(error)]),
        );

    const { epic$, epicMiddleware } = useReactObservableRequest([epic]);

    const {
        dispatch,
        dataRequest,
        dataError,
        dataSuccess,
        dataReset,
        getIsLoading,
        getData,
        getErrors,
    } = useRequest([epicMiddleware]);

    useEffect(() => {
        epic$.subscribe(dispatch);
    }, []);

    return html`
        <${Component}
            onClickRequest=${() => dispatch(dataRequest())}
            onClickSuccess=${() => dispatch(dataSuccess({ foo: 'Bar' }))}
            onClickError=${() => dispatch(dataError({ message: ['Sad : ('] }))}
            onClickReset=${() => dispatch(dataReset())}
            data=${getData()}
            loading=${getIsLoading()}
            errors=${getErrors()}
            ...${rest}
        />
    `;
}
