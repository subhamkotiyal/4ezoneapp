import { RESET_SUCCESS, REQUEST_RESET, RESET_FAIL } from './types';

export const resetRequest = (data) => ({
    type: REQUEST_RESET,
    data
    
});

export const resetSuccess = data => (
    {
        type: RESET_SUCCESS,
        data
    }
);
export const resetFail = () => (
    {
        type: RESET_FAIL
    }
);
