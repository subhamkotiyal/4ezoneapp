import { takeEvery, put } from 'redux-saga/effects';
import {
  GET_BOOKING_REQUEST,
  ASSIGN_BOOING_REQUEST,
  ASSIGN_BOOING_FAILURE
} from './types';
import {
  getPastBookingFail,
  getPastBookingSuccess,
  getUpcomingBookingFail,
  getUpcomingBookingSuccess,
assignBookingSuccess,
assignBookingFail
} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

// Get all booking
function* getBookingRequest({apiPastBooking,apiUpcomimgbooking}) {
 // yield* showLoader(false);
  try {
    const responsePast = yield Request.get(apiPastBooking);
    debugger
    const responseUpcoming = yield Request.get(apiUpcomimgbooking);
    if (responsePast.status === SUCCESS) {
      yield put(getPastBookingSuccess(responsePast.data));
      yield* hideLoader(false, '');
    } else {
      yield put(getPastBookingFail());
      yield* hideLoader(false, '')

    }
    if (responseUpcoming.status === SUCCESS) {
      yield put(getUpcomingBookingSuccess(responseUpcoming.data));
      yield* hideLoader(false, '');
    } else {
      yield put(getUpcomingBookingFail());
      yield* hideLoader(false, '')
      showToast(responseUpcoming.message, 'danger')

    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getUpcomingBookingFail());
    yield put(getPastBookingFail());
    showToast(error.message, 'danger')
  }
}

// Add  booking
function* assignBookingRequeat({apiName, data, navigation,cb}) {
  debugger
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiName, data);
    debugger
    console.log(response,"responseresponse")
    if (response.status === SUCCESS) {
      yield put(assignBookingSuccess(response.data));
      yield* hideLoader(false, '');
      if(!cb){
        showToast(response.message, 'success');
        return 
      }
      return cb(response.data)

    } else {
      yield put(assignBookingFail());
      yield* hideLoader(false, '');
      showToast(response.message, 'danger');
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(assignBookingFail());
    showToast(error.message, 'danger');
  }
}

function* sagaBooking() {
  yield takeEvery(GET_BOOKING_REQUEST, getBookingRequest)
  yield takeEvery(ASSIGN_BOOING_REQUEST, assignBookingRequeat)

}
export default sagaBooking;
