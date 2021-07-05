import { REGISTER, REGISTER_SUCCESS, REGISTER_FAIL } from './types';

export const registerRequest = (apiName,data, navigation) => ({
    type: REGISTER,
    apiName,
    data,
    navigation,
});

export const registerSuccess = data => (
    {
        type: REGISTER_SUCCESS,
        data
    }
);
export const registerFail = () => (
    {
        type: REGISTER_FAIL
    }
);
