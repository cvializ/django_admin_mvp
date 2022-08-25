import { Component } from '/@perpay-admin/src/components/Component';
import { useRequest } from '/@perpay-admin/src/hooks/useRequest';
import { html } from '/@perpay-admin/dependencies/htm';
import {
    of,
    concat,
} from '/@perpay-admin/dependencies/rxjs';
import {
    mergeMap,
    catchError,
    tap,
} from '/@perpay-admin/dependencies/rxjs-operators';
import { ofType } from '/@perpay-admin/src/lib/react-observable';


export const ComponentContainer = ({ ...rest }) => {
    const epic = (action$) =>
        action$.pipe(
            ofType(dataRequest().type),
            mergeMap(() => fetch('.')),
            mergeMap((x) => {
                return [dataSuccess({ foo: 'Bar' })];
            }),
            catchError((error, source$) => {
                return concat(of(dataError(error)), source$);
            }),
        );

    const {
        dispatch,
        dataRequest,
        dataError,
        dataSuccess,
        dataReset,
        getIsUnrequested,
        getIsLoading,
        getIsLoadingOrUnrequested,
        getData,
        getErrors,
    } = useRequest([epic]);

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
