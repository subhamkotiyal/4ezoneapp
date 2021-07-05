import {
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_FAILURE,
  ADD_ACCEPT_REJECT_SUCCESS,
  ADD_ACCEPT_REJECT_FAILURE,
  ADD_ACCEPT_REJECT_REQUEST,
} from './types';

//Add CurrentRequests actions
export const getCurrentRequestsBooking = (apiName, data, navigation) => ({
  type: GET_REQUESTS_REQUEST,
  apiName,
  data,
  navigation,
});

export const getCurrentBookingSuccess = data => ({
  type: GET_REQUESTS_SUCCESS,
  data,
});

export const getCurrentRequestsFail = () => ({
  type: GET_REQUESTS_FAILURE,
});

export const addAcceptRejectgRequest = (apiName, data, navigation,getRquest,cb) => ({
  type: ADD_ACCEPT_REJECT_REQUEST,
  apiName,
  data,
  navigation,
  getRquest,
  cb
});

export const addAcceptRejectgSuccess = data => ({
  type: ADD_ACCEPT_REJECT_SUCCESS,
  data,
});

export const addAcceptRejectFail = () => ({
  type: ADD_ACCEPT_REJECT_FAILURE,
});
