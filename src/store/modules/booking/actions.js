import {
  ADD_BOOING_SUCCESS,
  ADD_BOOING_REQUEST,
  ADD_BOOING_FAILURE,
  GET_PAST_BOOKING_SUCCESS,
  GET_PAST_BOOKING_FAILURE,
  GET_UPCOMING_BOOKING_SUCCESS,
  GET_BOOKING_REQUEST,
  GET_UPCOMING_BOOKING_FAILURE,
  ASSIGN_BOOING_FAILURE,
  ASSIGN_BOOING_SUCCESS,
  ASSIGN_BOOING_REQUEST
} from './types';

//Get  Booking actions
export const getBookingRequest = (apiPastBooking,apiUpcomimgbooking) => ({
  type: GET_BOOKING_REQUEST,
  apiPastBooking,
  apiUpcomimgbooking
});

export const getPastBookingSuccess = data => ({
  type: GET_PAST_BOOKING_SUCCESS,
  data,
});

export const getPastBookingFail = () => ({
  type: GET_PAST_BOOKING_FAILURE,
});


//Get Upcoming Booking actions
export const getUpcomingBookingSuccess = data => ({
  type: GET_UPCOMING_BOOKING_SUCCESS,
  data,
});

export const getUpcomingBookingFail = () => ({
  type: GET_UPCOMING_BOOKING_FAILURE,
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



//Add Booking actions
export const assignBookingRequest = (apiName, data, navigation,cb) => ({
  type: ASSIGN_BOOING_REQUEST,
  apiName,
  data,
  navigation,
  cb
});

export const assignBookingSuccess = data => ({
  type: ASSIGN_BOOING_SUCCESS,
  data,
});

export const  assignBookingFail = () => ({
  type: ASSIGN_BOOING_FAILURE,
});
