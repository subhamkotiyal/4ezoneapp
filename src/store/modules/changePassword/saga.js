import Axios from 'axios';
import { AsyncStorage } from 'react-native';
import { takeEvery, put, select } from 'redux-saga/effects';
import { PASSRESET_REQUESTED,FORGOT_REQUEST, PASSCHANGE_REQUESTED } from './types';
import { apiFail, apiSuccess } from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';

import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'
import { logoutSuccess, loginSuccess } from '../login/actions';
import {profileSuccess} from '../getProfile/actions';
import {registerSuccess} from '../register/actions';

function* onForgotRequested({ data, navigation }) {
  yield* showLoader(false);
  try {
    const loginData = yield Request.post(
      Config.forgotPassword,
      data,
    );
    if (loginData.status === SUCCESS) {
      yield* hideLoader(false, '');
      yield put(apiSuccess(loginData.data));
      setTimeout(() => {
        navigation.navigate('VerifyOTP',{
            email:loginData.data.email,
            OTP:loginData.data.OTP
        })
      }, 100);
      showToast(loginData.message, 'success')

    } else {
      yield* hideLoader(false, '');
      yield put(apiFail());
      // eslint-disable-next-line no-undef
      showToast(loginData.message, 'danger')
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield* hideLoader(false, '');
    yield put(apiFail());
    showToast('Invalid email', 'danger')
  }
}




function* onResetRequested({ data, navigation }) {
  yield* showLoader(false);
  try {
    const loginData = yield Request.post(
      Config.resetpassword,
      data,
    );
    if (loginData.status === SUCCESS) {
      yield* hideLoader(false, '');
      yield put(apiSuccess(loginData.data));
      setTimeout(() => {
        navigation.popToTop()
      }, 100);
      showToast(loginData.message, 'success')
    } else {
      yield* hideLoader(false, '');
      yield put(apiFail());
      // eslint-disable-next-line no-undef
      showToast(loginData.message, 'danger')
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield* hideLoader(false, '');
    yield put(apiFail());
    showToast(error.message, 'danger')
  }
}



function* onChangeRequested({data, navigation }) {
  yield* showLoader(false);
  try {
    const loginData = yield Request.post(
      Config.changepassword,
      data,
    );
    if (loginData.status === SUCCESS) {
      yield* hideLoader(false, '');
      yield put(apiSuccess(loginData.data));
      yield put(profileSuccess(loginData.data));
      yield put(loginSuccess(loginData.data));
      showToast(loginData.message, 'success')

      setTimeout(() => {
        navigation.goBack();
      }, 100);
    } else {
      yield* hideLoader(false, '');
      yield put(apiFail());
      showToast(loginData.message, 'danger')
    }
  } catch (error) {
    console.log(JSON.stringify(error));

    yield* hideLoader(false, '');
    yield put(apiFail());
    showToast(error.message, 'danger')
  }
}

function* sagaChangeP() {
  yield takeEvery(FORGOT_REQUEST, onForgotRequested);
  yield takeEvery(PASSRESET_REQUESTED, onResetRequested);
  yield takeEvery(PASSCHANGE_REQUESTED, onChangeRequested);
}
export default sagaChangeP;
