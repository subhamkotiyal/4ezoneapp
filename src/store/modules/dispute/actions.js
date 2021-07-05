import {
  GET_INPROCESS_DISPUTE_SUCCESS,
  GET_INPROCESS_DISPUTE_FAILURE,
  GET_DISPUTE_REQUEST,
  UPDATE_DIPUTE_REQUEST,
  GET_COMPLETED_DISPUTE_FAILURE,
  GET_COMPLETED_DISPUTE_SUCCESS,
  SEND_TO_DISPUTE_REQUEST,
  SEND_TO_DISPUTE_SUCCESS,
  SEND_TO_DISPUTE_FAIL,
  RATING_REQUEST,
  RATING_SUCCESS,
  RATING_FAIL
} from './types';

//Get  Booking actions
export const getDisputeRequest = (apiName) => ({
  type: GET_DISPUTE_REQUEST,
  apiName
});

export const getCompletedDisputeSuccess = data => ({
  type: GET_COMPLETED_DISPUTE_SUCCESS,
  data,
});

export const getCompletedDisputeFail = () => ({
  type: GET_COMPLETED_DISPUTE_FAILURE
});


//Get Upcoming Booking actions
export const getInProcessDisputeSuccess = data => ({
  type: GET_INPROCESS_DISPUTE_SUCCESS,
  data,
});

export const getInProcessDisputeFail = () => ({
  type: GET_INPROCESS_DISPUTE_FAILURE,
});


//Add Booking actions
export const addBookingRequest = (apiName, data, navigation) => ({
  type: ADD_BOOING_REQUEST,
  apiName,
  data,
  navigation
});

export const addBookingSuccess = data => ({
  type: ADD_BOOING_SUCCESS,
  data,
});

export const addBookingFail = () => ({
  type: ADD_BOOING_FAILURE,
});


//Send Dispute actions
export const sendDisputeRequest = (apiName,data, navigation) => ({
  type: SEND_TO_DISPUTE_REQUEST,
  apiName,
  data,
  navigation
});

export const sendDisputeSuccess = data => ({
  type: SEND_TO_DISPUTE_SUCCESS,
  data,
});

export const sendDisputeFail = () => ({
  type: SEND_TO_DISPUTE_FAIL,
});


//Rating  actions
export const ratingRequest = (apiName,data, navigation,getAppointments) => ({
  type: RATING_REQUEST,
  apiName,
  data,
  navigation,
  getAppointments
});

export const ratingSuccess = data => ({
  type: RATING_SUCCESS,
  data,
});

export const ratingFail = () => ({
  type: RATING_FAIL,
});




//Add Booking actions
export const updateDisputeRequest= (apiName, data, navigation) => ({
  type: UPDATE_DIPUTE_REQUEST,
  apiName,
  data,
  navigation
});
