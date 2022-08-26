import { Component } from '/@perpay-admin/src/components/Component';
import { html } from '/@perpay-admin/dependencies/htm';
import { mergeMap } from '/@perpay-admin/dependencies/rxjs-operators';
import { handleError, ofType } from '/@perpay-admin/src/lib/react-observable';
import { useConstCallback } from '/@perpay-admin/src/hooks/useConstCallback';
import { getInitialRequestState, useRequest } from '/@perpay-admin/src/hooks/useRequest';
import { useMiddlewareReducer } from '/@perpay-admin/src/hooks/useMiddlewareReducer';
import { useReactObservableMiddleware } from '/@perpay-admin/src/hooks/useReactObservableMiddleware';

const fetchUsers = () => globalThis.fetch('/api/users').then((response) => response.text());

export const ComponentContainer = ({ ...rest }) => {
    const {
        reducer,
        dataRequest,
        dataError,
        dataSuccess,
        dataReset,
        getIsLoading,
        getData,
        getErrors,
    } = useRequest();

    const epic = useConstCallback((action$) => action$.pipe(
        ofType(dataRequest().type),
        mergeMap(() => fetchUsers()),
        mergeMap((text) => [dataSuccess(text)]),
        handleError((error) => [dataError({ message: [error.message] })]),
    ));
    const middleware = useReactObservableMiddleware([epic]);
    const [state, dispatch] = useMiddlewareReducer(reducer, getInitialRequestState(), [middleware]);

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
            data=${getData(state)}
            loading=${getIsLoading(state)}
            errors=${getErrors(state)}
            ...${rest}
        />
    `;
};
