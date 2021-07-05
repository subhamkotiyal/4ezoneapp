import {
  ADD_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_REQUEST,
  ADD_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
  ACCOUNT_FAILURE,
} from './types';

export const addAccountRequest = (apiName,data, navigation) => ({
  type: ADD_ACCOUNT_REQUEST,
  apiName,
  data,
  navigation,
});
export const updateAccountRequest = (apiName,data, navigation) => ({
  type: UPDATE_ACCOUNT_REQUEST,
  apiName,
  data,
  navigation,
});

export const addAccountSuccess = data => ({
  type: ADD_ACCOUNT_SUCCESS,
  data,
});
export const updateAccountSuccess = data => ({
  type: UPDATE_ACCOUNT_SUCCESS,
  data,
});
export const accountFail = () => ({
  type: ACCOUNT_FAILURE,
});
