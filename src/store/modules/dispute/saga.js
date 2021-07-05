import { takeEvery, put } from 'redux-saga/effects';
import {
  SEND_TO_DISPUTE_REQUEST,GET_DISPUTE_REQUEST,
  GET_BOOKING_REQUEST, UPDATE_DIPUTE_REQUEST,
  RATING_REQUEST
} from './types';
import { CommonActions } from '@react-navigation/native';

import {
  sendDisputeSuccess,
  sendDisputeFail,
  getCompletedDisputeFail,
  getCompletedDisputeSuccess,
  getInProcessDisputeFail,
  getInProcessDisputeSuccess,
  ratingSuccess,
  ratingFail,
  getDisputeRequest,
} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';

import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

// Get all booking
function* getDiputesRequest({apiName}) {
  yield* showLoader(false);
  try {
   // const responseComp = yield Request.get(Config.getCompletedDispute);
    const responseInProcess = yield Request.get(apiName);
    // if (responseComp.status === SUCCESS) {
    //   yield put(getCompletedDisputeSuccess(responseComp.data));
    //   yield* hideLoader(false, '');
    // } else {
    //   yield put(getCompletedDisputeFail());
    //   yield* hideLoader(false, '')
    // }
    if (responseInProcess.status === SUCCESS) {
      yield put(getInProcessDisputeSuccess(responseInProcess.data));
      yield* hideLoader(false, '');
    } else {
      yield put(getInProcessDisputeFail());
      yield* hideLoader(false, '')
      showToast(responseInProcess.message, 'danger')

    }
  } catch (error) {
    yield* hideLoader(false, '');
    // yield put(getCompletedDisputeFail());
    yield put(getInProcessDisputeFail());
    showToast(error.message, 'danger')

  }
}

// Send to dispute
function* sendToDisputeRequest({ apiName,data, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiName,data);
    if (response.status === SUCCESS) {
      yield put(sendDisputeSuccess(response.data));
      yield put(getDisputeRequest())
      yield* hideLoader(false, '');
      navigation.popToTop()

    } else {
      yield put(sendDisputeFail());
     // navigation.popToTop()
      yield* hideLoader(false, '')
      showToast(response.message, 'danger')

    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(sendDisputeFail());
    showToast(error.message, 'danger')
  }
}
// Send to dispute
function* updateDisputeRequest({ apiName,data, navigation }) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiName,data);
    if (response.status === SUCCESS) {
      yield* hideLoader(false, '');
      navigation.popToTop()
    } else {
      yield put(sendDisputeFail());
      yield* hideLoader(false, '')
      showToast(response.message, 'danger')

    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(sendDisputeFail());
    showToast(error.message, 'danger')

  }
}

// Rating Request
function* ratingRequestSubmit({apiName, data, navigation,getAppointments }) {
  debugger
  yield* showLoader(false);
  try {
    const response = yield Request.post(apiName, data);
    if (response.status === SUCCESS) {
      yield put(ratingSuccess(response.data));
      yield* hideLoader(false, '');
      if(getAppointments){
        getAppointments()
      }
      navigation.popToTop()
    } else {
      yield put(ratingFail());
      yield* hideLoader(false, '')
      showToast(response.message, 'danger')

    }
  } catch (error) {
    yield* hideLoader(false, '');
    yield put(ratingFail());
    showToast(error.message, 'danger')

  }
}


function* sagaDispute() {
  yield takeEvery(GET_DISPUTE_REQUEST, getDiputesRequest)
  yield takeEvery(SEND_TO_DISPUTE_REQUEST, sendToDisputeRequest)
  yield takeEvery(RATING_REQUEST, ratingRequestSubmit)
  yield takeEvery(UPDATE_DIPUTE_REQUEST,updateDisputeRequest)

}
export default sagaDispute;
