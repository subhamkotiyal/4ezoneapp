
import {takeEvery, put,select} from 'redux-saga/effects';
import {ADD_ACCOUNT_REQUEST, UPDATE_ACCOUNT_REQUEST} from './types';
import {addAccountSuccess, updateAccountSuccess, accountFail} from './actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'
import {profileSuccess} from '../getProfile/actions';
import {loginSuccess} from '../login/actions'
function* onAddAccountRequest({apiName,data, navigation}) {
  yield* showLoader(false);
  try {
    const accountData = yield Request.post(
      apiName,
      data,
    );
    if (accountData.status === SUCCESS) {
      const state = yield select();
      const {profileData} = state.getProfileReducer
      console.log(profileData.accountDetails,"state")
      yield put(loginSuccess(accountData.data));
      yield put(addAccountSuccess());
      yield put(profileSuccess(accountData.data));

      yield* hideLoader(false, '');
      if(profileData.accountDetails){
        showToast('Account updated successfully.','success')
      }else{
        showToast('Account added successfully.','success')

      }
      navigation.goBack();
    } else {
      yield* hideLoader(false, '');
      yield put(accountFail());
      showToast(accountData.message,'danger')

    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield* hideLoader(false, '');
    yield put(accountFail());
    showToast(error.message,'danger')
  }
}

function* onUpdateAccountRequest({apiName,data, navigation}) {
  yield* showLoader(false);
  try {
    const accountData =  yield Request.post(
      apiName,
      data,
    );
    console.log('data:   ' + JSON.stringify(accountData));
    if (accountData.status === SUCCESS) {
      yield put(loginSuccess(accountData.data));
      yield put(profileSuccess(accountData.data));

      yield put(updateAccountSuccess());
      yield* hideLoader(false, '');
      showToast('Account updated successfully.','success')
      navigation.goBack()
    } else {
      showToast(accountData.message,'danger')

      yield put(accountFail());
      yield* hideLoader(false, '');
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield put(accountFail());
    yield* hideLoader(false, '');
    showToast(error.message,'danger')
  }
}

function* sagaAccount() {
  yield takeEvery(ADD_ACCOUNT_REQUEST, onAddAccountRequest);
  yield takeEvery(UPDATE_ACCOUNT_REQUEST, onUpdateAccountRequest);
}
export default sagaAccount;
