import { UNREQUESTED_STATE } from "/@perpay-admin/src/constants/dataModuleStates";

export const getDataModuleInitialState = (optInitialValue) => ({
    requestState: UNREQUESTED_STATE,
    value: optInitialValue ? { ...optInitialValue } : null,
    errors: {},
});
