import Axios from 'axios';
import {AsyncStorage} from 'react-native';
import {takeEvery, put, call} from 'redux-saga/effects';
import {REGISTER} from './types';
import {registerFail, registerSuccess} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';

import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'
function* onRegisterRequested({apiName,data, navigation}) {
  yield* showLoader(false);
  try {
    const response = yield Request.post(
      apiName,
      data
    );
    debugger
    console.log(`........................response===`, response)
    if (response.status == SUCCESS) {
      yield put(registerSuccess(response.data));
      yield* hideLoader(false, '');
      navigation.navigate('Thankyou');
    } else {
      yield* hideLoader(false, '');
      yield put(registerFail());
      showToast(response.message,'danger')
    }
  } catch (error) {
    //console.log(JSON.stringify(error));
    showToast(error.message,'danger')
    yield* hideLoader(false, '');
    yield put(registerFail());
  }
}

function* sagaRegister() {
  yield takeEvery(REGISTER, onRegisterRequested);
}
export default sagaRegister;
