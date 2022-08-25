// Data modules but as a hook
import { useMiddlewareReducer } from '/@perpay-admin/src/hooks/useMiddlewareReducer';

export const UNREQUESTED_STATE = 'unrequested';
export const LOADING_STATE = 'loading';
export const SUCCESS_STATE = 'success';
export const ERROR_STATE = 'error';

const REQUEST_ACTION = 'REQUEST_ACTION';
const ERROR_ACTION = 'ERROR_ACTION';
const SUCCESS_ACTION = 'SUCCESS_ACTION';
const RESET_ACTION = 'RESET_ACTION';

export const getInitialState = (optInitialValue) => ({
    requestState: UNREQUESTED_STATE,
    value: optInitialValue,
    errors: {},
});

const requestReducer = (state = getInitialState(), action = {}) => {
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
        return getInitialState();
    default:
        return state;
    }
};

const getRoot = (state) => state;
const getIsUnrequested = (state) => getRoot(state).requestState === UNREQUESTED_STATE;
const getIsLoading = (state) => getRoot(state).requestState === LOADING_STATE;
const getIsLoadingOrUnrequested = (state) => [
    UNREQUESTED_STATE,
    LOADING_STATE,
].includes(getRoot(state).requestState);
const getData = (state) => getRoot(state).value;
const getErrors = (state) => getRoot(state).errors;

const dataRequest = (payload) => ({
    type: REQUEST_ACTION,
    payload,
});

const dataError = (errors) => ({
    type: ERROR_ACTION,
    payload: errors,
});

const dataSuccess = (payload) => ({
    type: SUCCESS_ACTION,
    payload,
});

const dataReset = () => ({
    type: RESET_ACTION,
});

export const useRequest = (middlewares = []) => {
    const [state, dispatch] = useMiddlewareReducer(
        requestReducer,
        getInitialState(),
        middlewares,
    );

    return {
        dispatch,

        dataRequest,
        dataError,
        dataSuccess,
        dataReset,

        getIsUnrequested: () => getIsUnrequested(state),
        getIsLoading: () => getIsLoading(state),
        getIsLoadingOrUnrequested: () => getIsLoadingOrUnrequested(state),
        getData: () => getData(state),
        getErrors: () => getErrors(state),
    };
};
