import {takeEvery, put, select} from 'redux-saga/effects';
import {Alert} from 'react-native';
import Axios from 'axios';
import {
  DOCUMENT_ADD_REQUEST,
  DOCUMENT_UPDATE_REQUEST,
  DOCUMENT_LIST_REQUEST,
} from './types';
import {
  documentAddSuccess,
  documentUpdateSuccess,
  documentListSuccess,
  documentFail,
} from './actions';
import {registerSuccess} from '../register/actions';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';

import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'
function* onDocumentAddRequest({apiName,data, navigation,cb}) {
  yield* showLoader(false);
  try {
    const loginData = yield Request.post(
      apiName,
      data,
    );
    if (loginData.status === SUCCESS) {
      yield put(documentAddSuccess(loginData.data));
      yield put(registerSuccess(null));

      cb(loginData.data)
      yield* hideLoader(false, '');
      yield showToast('Document added successfully.','success')
    } else {
      yield put(documentFail());
      yield* hideLoader(false, '');
      // eslint-disable-next-line no-undef
      yield showToast(loginData.message,'danger');
    }
  }catch (error) {
    var aa = error;
    yield put(documentFail());
    yield* hideLoader(false, '');
    showToast(error.message)
  }

}

function* onDocumentUpdateRequest({apiName,data, navigation,cb}) {
  yield* showLoader(false);
  try {
  const loginData = yield Request.post(
    apiName,
    data,
  );
  if (loginData.status === SUCCESS) {
    yield put(documentUpdateSuccess(loginData.data));
    cb(loginData.data)
    yield* hideLoader(false, '');
    yield showToast('Document added successfully.','success')
  } else {
    yield put(documentFail());
    yield* hideLoader(false, '');
    // eslint-disable-next-line no-undef
    yield showToast(loginData.message,'danger');
  }
}catch (error) {
  var aa = error;
  yield put(documentFail());
  yield* hideLoader(false, '');
  showToast(error.message)
}
}

function* sagaDocuments() {
  yield takeEvery(DOCUMENT_ADD_REQUEST, onDocumentAddRequest);
  yield takeEvery(DOCUMENT_UPDATE_REQUEST, onDocumentUpdateRequest);
}
export default sagaDocuments;
