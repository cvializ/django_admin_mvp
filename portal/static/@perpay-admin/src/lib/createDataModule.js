import {
    LOADING_STATE,
    UNREQUESTED_STATE,
} from '/@perpay-admin/src/constants/dataModuleStates';
import { createDataModuleReducer } from '/@perpay-admin/src/lib/createDataModuleReducer';

// Only for use by internal data module api functions
const internalCreateDataModule = ({
    getRoot,
    initialValue,
    REQUEST_ACTION,
    ERROR_ACTION,
    SUCCESS_ACTION,
    RESET_ACTION,
    dataRequest,
    dataError,
    dataSuccess,
    dataReset,
    epic,
}) => ({
    getRoot,
    initialValue,
    REQUEST_ACTION,
    ERROR_ACTION,
    SUCCESS_ACTION,
    RESET_ACTION,
    dataRequest,
    dataSuccess,
    dataError,
    dataReset,
    epic,
    reducer: createDataModuleReducer(
        REQUEST_ACTION,
        ERROR_ACTION,
        SUCCESS_ACTION,
        RESET_ACTION,
        initialValue
    ),
    getIsUnrequested: (state) =>
        getRoot(state).requestState === UNREQUESTED_STATE,
    getIsLoading: (state) => getRoot(state).requestState === LOADING_STATE,
    getIsLoadingOrUnrequested: (state) =>
        [UNREQUESTED_STATE, LOADING_STATE].includes(
            getRoot(state).requestState
        ),
    getData: (state) => getRoot(state).value,
    getErrors: (state) => getRoot(state).errors,
});

export const createDataModule = ({
    dataRequest,
    dataError,
    dataSuccess,
    dataReset,
    epic,
}) => {
    const REQUEST_ACTION = dataRequest().type;
    const ERROR_ACTION = dataError().type;
    const SUCCESS_ACTION = dataSuccess().type;
    const RESET_ACTION = dataReset().type;

    const getDataModuleInstance = ({ getRoot, initialValue }) =>
        internalCreateDataModule({
            getRoot,
            initialValue,
            REQUEST_ACTION,
            ERROR_ACTION,
            SUCCESS_ACTION,
            RESET_ACTION,
            dataRequest,
            dataError,
            dataSuccess,
            dataReset,
            epic,
        });
    return getDataModuleInstance;
};
