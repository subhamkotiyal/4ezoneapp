import {takeEvery, put} from 'redux-saga/effects';
import {
  GET_DAY_EARNING_REQUEST,
  GET_WEEK_EARNING_REQUEST,
} from './types';
import {
  getDayEarningFail,
  getDayEarningSuccess,
  getWeekEarningFail,
  getWeekEarningSuccess,
} from './actions';
import {showLoader, showToast, hideLoader} from '_utils/methods';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Request} from '_services';
import { CommonActions } from '@react-navigation/native';

// Add  booking
function* getDayEarningRequest({apiName}) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(apiName);
    debugger
    if (response.status === SUCCESS) {
      yield put(getDayEarningSuccess(response));
      yield* hideLoader(false, '');
    } else {
      yield put(getDayEarningFail());
      yield* hideLoader(false, '');
      showToast(response.message, 'danger')
    }
  } catch (error) {
    showToast(error.message, 'danger')

    // yield* hideLoader(false, '');
    yield put(getDayEarningFail());
  }
}

// Add  booking
function* getWeekEarningRequest({apiName, navigation}) {
  yield* showLoader(false);
  try {
    const response = yield Request.get(apiName);
    debugger
    if (response.status === SUCCESS) {
      yield put(getWeekEarningSuccess(response));
      yield* hideLoader(false, '');   
    } else {
      yield put(getWeekEarningFail());
      yield* hideLoader(false, '');
      showToast(response.message, 'danger');
    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(getWeekEarningFail());
    showToast(error.message, 'danger');
  }
}
function* sagaBookingRequests() {
  yield takeEvery(GET_DAY_EARNING_REQUEST, getDayEarningRequest);
  yield takeEvery(GET_WEEK_EARNING_REQUEST, getWeekEarningRequest);
}
export default sagaBookingRequests;
