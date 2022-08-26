import { createDataModuleActions } from "/@perpay-admin/src/lib/createDataModuleActions";

const fetchUsersActions = createDataModuleActions(
    'FETCH_USERS'
);
export const fetchUsers = fetchUsersActions.dataRequest;
export const fetchUsersSuccess = fetchUsersActions.dataSuccess;
export const fetchUsersError = fetchUsersActions.dataError;
export const fetchUsersReset = fetchUsersActions.dataReset;
