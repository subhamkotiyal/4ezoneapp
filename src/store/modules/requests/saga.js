import {takeEvery, put} from 'redux-saga/effects';
import {GET_REQUESTS_REQUEST, ADD_ACCEPT_REJECT_REQUEST} from './types';
import {
  getCurrentBookingSuccess,
  getCurrentRequestsFail,
  addAcceptRejectFail,
  addAcceptRejectgSuccess,
} from './actions';
import {showLoader, showToast, hideLoader} from '_utils/methods';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Request} from '_services';
import { CommonActions } from '@react-navigation/native';

// Add  booking
function* getCurrentBookingRequest({apiName, data, navigation}) {
  //yield* showLoader(false);
  try {
    const response = yield Request.get(apiName);
    if (response.status === SUCCESS) {
      yield put(getCurrentBookingSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      yield put(getCurrentRequestsFail());
      yield* hideLoader(false, '');
      showToast(response.message, 'danger');
    }
  } catch (error) {
    showToast(error.message, 'danger');
   yield* hideLoader(false, '');
    yield put(getCurrentRequestsFail());
  }
}

// Add  booking
function* addAcceptRejectRequest({apiName, data, navigation, getRquest,cb}) {
 yield* showLoader(false);
  try {
    const response = yield Request.post(apiName, data);
    if (response.status === SUCCESS) {
      yield put(addAcceptRejectgSuccess(response.data));
      yield* hideLoader(false, '');
      //  const responseRequests = yield Request.get(getRquest);
      // if (responseRequests.status === SUCCESS) {
      //   yield put(getCurrentBookingSuccess(response.data.data));
      // }
      if(!cb){
        showToast(response.message, 'success');
       return

      }
      return cb(response.data)

    } else {
      yield put(addAcceptRejectFail());
      yield* hideLoader(false, '');
      showToast(response.message, 'danger');
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(addAcceptRejectFail());
    showToast(error.message, 'danger');
  }
}
function* sagaBookingRequests() {
  yield takeEvery(ADD_ACCEPT_REJECT_REQUEST, addAcceptRejectRequest);
  yield takeEvery(GET_REQUESTS_REQUEST, getCurrentBookingRequest);
}
export default sagaBookingRequests;
