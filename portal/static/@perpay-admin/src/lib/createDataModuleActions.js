export const createDataModuleActions = (
    prefix,
    payloadCreatorOverrides = {}
) => {
    const REQUEST_ACTION_TYPE = `${prefix}::REQUEST`;
    const SUCCESS_ACTION_TYPE = `${prefix}::SUCCESS`;
    const ERROR_ACTION_TYPE = `${prefix}::ERROR`;
    const RESET_ACTION_TYPE = `${prefix}::RESET`;

    // By default, most of our action types will take a single argument
    // which is the payload value of the created action
    // The exception to this is dataReset, which doesn't have a payload
    const defaultPayloadCreators = {
        dataRequest: (payload) => payload,
        dataSuccess: (payload) => payload,
        dataError: (error) => error,
        dataReset: null,
    };
    const payloadCreators = {
        ...defaultPayloadCreators,
        ...payloadCreatorOverrides,
    };

    const payloadKeyAndValueFromFunction = (
        payloadCreatorFunction,
        ...payloadArgs
    ) => {
        // Determine if there is a defined function to create a payload from arguments.
        // If not, we don't want to add the `payload` key to the action object.
        const isFunction = typeof payloadCreatorFunction === 'function';
        return isFunction
            ? { payload: payloadCreatorFunction(...payloadArgs) }
            : {};
    };

    // Here we are returning an object of action creators.
    // Depending on overrides provided to this function, these
    // action creators can take a variable number of arguments to
    // their payload, or can be configured to not have a payload at all.
    return {
        dataRequest: (...payloadArgs) => ({
            type: REQUEST_ACTION_TYPE,
            ...payloadKeyAndValueFromFunction(
                payloadCreators.dataRequest,
                ...payloadArgs
            ),
        }),
        dataSuccess: (...payloadArgs) => ({
            type: SUCCESS_ACTION_TYPE,
            ...payloadKeyAndValueFromFunction(
                payloadCreators.dataSuccess,
                ...payloadArgs
            ),
        }),
        dataError: (...payloadArgs) => ({
            type: ERROR_ACTION_TYPE,
            ...payloadKeyAndValueFromFunction(
                payloadCreators.dataError,
                ...payloadArgs
            ),
        }),
        dataReset: (...payloadArgs) => ({
            type: RESET_ACTION_TYPE,
            ...payloadKeyAndValueFromFunction(
                payloadCreators.dataReset,
                ...payloadArgs
            ),
        }),
    };
};
