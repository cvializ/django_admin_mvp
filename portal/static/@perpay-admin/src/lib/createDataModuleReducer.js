import {
    ERROR_STATE,
    LOADING_STATE,
    SUCCESS_STATE,
} from '/@perpay-admin/src/constants/dataModuleStates';
import { getDataModuleInitialState } from '/@perpay-admin/src/lib/getDataModuleInitialState';

export const createDataModuleReducer =
    (
        REQUEST_ACTION,
        ERROR_ACTION,
        SUCCESS_ACTION,
        RESET_ACTION,
        optInitialValue
    ) =>
    (state = getDataModuleInitialState(optInitialValue), action = {}) => {
        switch (action.type) {
            case REQUEST_ACTION:
                return {
                    ...state,
                    requestState: LOADING_STATE,
                    errors: {},
                };
            case ERROR_ACTION:
                return {
                    ...state,
                    requestState: ERROR_STATE,
                    errors: action.payload,
                };
            case SUCCESS_ACTION:
                return {
                    ...state,
                    requestState: SUCCESS_STATE,
                    value: action.payload,
                };
            case RESET_ACTION:
                return getDataModuleInitialState(optInitialValue);
            default:
                return state;
        }
    };
