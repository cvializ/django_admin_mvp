import { mergeMap } from "/@perpay-admin/dependencies/rxjs-operators";
import { fetchUsers as fetchUsersAction, fetchUsersError, fetchUsersSuccess } from "/@perpay-admin/src/actions/dataModules/fetchUsers";
import { handleError, ofType } from "/@perpay-admin/src/lib/reactObservable";

const doFetchUsers = () => globalThis.fetch('/api/users').then((response) => response.text());

export const fetchUsers = (action$) => action$.pipe(
    ofType(fetchUsersAction().type),
    mergeMap(() => doFetchUsers()),
    mergeMap((text) => [fetchUsersSuccess({ text })]),
    handleError((error) => [fetchUsersError({ message: [error.message] })]),
);
