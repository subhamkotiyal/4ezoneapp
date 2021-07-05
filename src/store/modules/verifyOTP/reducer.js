import { RESET_SUCCESS, REQUEST_RESET, RESET_FAIL } from './types';

const INITIAL_STATE = {
    resetData: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REQUEST_RESET:
            return {
                ...state,
            };
        case RESET_SUCCESS:
            return {
                ...state,
                resetData: action.data
            };
        case RESET_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
};
