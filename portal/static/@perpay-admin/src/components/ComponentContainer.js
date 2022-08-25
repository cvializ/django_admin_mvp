import { Component } from '/@perpay-admin/src/components/Component';
import { useReactObservableRequest } from '/@perpay-admin/src/hooks/useReactObservableRequest';
import { html } from '/@perpay-admin/dependencies/htm';
import { mergeMap } from '/@perpay-admin/dependencies/rxjs-operators';
import { handleError, ofType } from '/@perpay-admin/src/lib/react-observable';


export const ComponentContainer = ({ ...rest }) => {
    const epic = (action$) =>
        action$.pipe(
            ofType(dataRequest().type),
            mergeMap(() => fetch('./index.html').then(response => response.text())),
            mergeMap((text) => [dataSuccess(text)]),
            handleError((error) => {
                return [dataError(error)];
            }),
        );

    const {
        dispatch,
        dataRequest,
        dataError,
        dataSuccess,
        dataReset,
        getIsLoading,
        getData,
        getErrors,
    } = useReactObservableRequest([epic]);

    return html`
        <${Component}
            onClickRequest=${() => dispatch(dataRequest())}
            onClickSuccess=${() => dispatch(dataSuccess('bar'))}
            onClickError=${() => dispatch(dataError({ message: ['Sad : ('] }))}
            onClickReset=${() => dispatch(dataReset())}
            data=${getData()}
            loading=${getIsLoading()}
            errors=${getErrors()}
            ...${rest}
        />
    `;
}
