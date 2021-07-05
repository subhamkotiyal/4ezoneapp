import Axios from 'axios';
import {takeEvery, put} from 'redux-saga/effects';
import {REQUEST_RESET} from './types';
import {resetSuccess, resetFail} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import { Request } from '_services'

import Config, { SUCCESS } from '_utils/constants/apiConstant';

function* onResetRequested({data}) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      Config.resendotp,
      data
    );
    debugger
    if (response.status === SUCCESS) {
      showToast(response.message,'success')
      yield put(resetSuccess(response.data));
      yield* hideLoader(false, '');
    } else {
      showToast(response.message,'danger')
      yield* hideLoader(false, '');
      
      yield put(resetFail());
    }
  } catch (error) {
    showToast(error.message,'danger')
    yield* hideLoader(false, '');
    yield put(resetFail());

  }
}

function* sagaVerifyOtp() {
  yield takeEvery(REQUEST_RESET, onResetRequested);
}
export default sagaVerifyOtp;
