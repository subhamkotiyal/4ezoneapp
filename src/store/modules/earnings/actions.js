import {
  GET_DAY_EARNING_SUCCESS,
  GET_DAY_EARNING_REQUEST,
  GET_DAY_EARNING_FAILURE,
  GET_WEEK_EARNING_SUCCESS,
  GET_WEEK_EARNING_FAILURE,
  GET_WEEK_EARNING_REQUEST,
} from './types';

//Add CurrentRequests actions
export const getDayEarningRequests = (apiName, data, navigation) => ({
  type: GET_DAY_EARNING_REQUEST,
  apiName,
  data,
  navigation,
});

export const getDayEarningSuccess = data => ({
  type: GET_DAY_EARNING_SUCCESS,
  data,
});

export const getDayEarningFail = () => ({
  type: GET_DAY_EARNING_FAILURE,
});

export const getWeekEarningRequest = (apiName, data, navigation) => ({
  type: GET_WEEK_EARNING_REQUEST,
  apiName,
  data,
  navigation,
});

export const getWeekEarningSuccess = data => ({
  type: GET_WEEK_EARNING_SUCCESS,
  data,
});

export const getWeekEarningFail = () => ({
  type: GET_WEEK_EARNING_FAILURE,
});
