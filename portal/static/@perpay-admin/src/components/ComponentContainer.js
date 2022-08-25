import { Component } from '/@perpay-admin/src/components/Component';
import { useReactObservableRequest } from '/@perpay-admin/src/hooks/useReactObservableRequest';
import { html } from '/@perpay-admin/dependencies/htm';
import { mergeMap } from '/@perpay-admin/dependencies/rxjs-operators';
import { handleError, ofType } from '/@perpay-admin/src/lib/react-observable';
import { useConstCallback } from '/@perpay-admin/src/hooks/useConstCallback';

export const ComponentContainer = ({ ...rest }) => {
    const epic = (action$) => action$.pipe(
        ofType(dataRequest().type),
        mergeMap(() => fetch('/api/users').then((response) => response.text())),
        mergeMap((text) => [dataSuccess(text)]),
        handleError((error) => [dataError(error)]),
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

    const onClickRequestCb = useConstCallback(() => dispatch(dataRequest()));
    const onClickSuccessCb = useConstCallback(() => dispatch(dataSuccess('bar')));
    const onClickErrorCb = useConstCallback(() => dispatch(dataError({ message: ['Sad : ('] })));
    const onClickResetCb = useConstCallback(() => dispatch(dataReset()));

    return html`
        <${Component}
            onClickRequest=${onClickRequestCb}
            onClickSuccess=${onClickSuccessCb}
            onClickError=${onClickErrorCb}
            onClickReset=${onClickResetCb}
            data=${getData()}
            loading=${getIsLoading()}
            errors=${getErrors()}
            ...${rest}
        />
    `;
};
