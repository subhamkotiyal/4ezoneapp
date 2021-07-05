import {takeEvery, put} from 'redux-saga/effects';
import {
  GET_SESSION_REQUEST,
  UPDATE_SESSION_REQUEST,
  ADD_SESSION_REQUEST
} from './types';
import {getSessionFail,getSessionSuccess, addSessionSuccess,addSessionFail,
  deleteSessionFail,deleteSessionSuccess, updateSessionSuccess, updateSessionFail} from './actions';

import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

function* onSessionRequested({apiName,data}) {
  yield* showLoader(false);
  try {
    const SessionData = yield Request.get(apiName);
    debugger
    if (SessionData.status === SUCCESS) {
      yield put(getSessionSuccess(SessionData.data));
      yield* hideLoader(false, '');
      
    } else {
      yield put(getSessionFail());
      yield* hideLoader(false, '');
      showToast(SessionData.message, 'danger')

    }
  } catch (error) {
    yield put(getSessionFail());
    showToast(error.message, 'danger')
    yield* hideLoader(false, '');
  }
}


function* addSessionRequest({addApi,data,navigation,getApi}) {
  yield* showLoader(false);
  try {
    const gymSessions = yield Request.post(addApi,data);
    debugger
    if (gymSessions.status === SUCCESS) {
      const SessionData = yield Request.get(getApi);
      if (SessionData.status === SUCCESS) {
        yield put(getSessionSuccess(SessionData.data));        
      }      
     yield put(addSessionSuccess());
      yield* hideLoader(false, '');
      navigation.goBack()
      yield showToast(gymSessions.message,'success')
    }else {
      yield put(addSessionFail());
      yield* hideLoader(false, '');
      showToast(gymSessions.message, 'danger')

    }
   
  } catch (error) {
    yield put(addSessionFail());
    showToast(error.message, 'danger')
    yield* hideLoader(false, '');
  }
}

function* updateSessionRequest({addApi,data,navigation,getApi}) {
  debugger
  yield* showLoader(false);
  try {
    const gymSessions = yield Request.post(addApi,data);
    if (gymSessions.status === SUCCESS) {
      const SessionData = yield Request.get(getApi);
      if (SessionData.status === SUCCESS) {
        yield put(getSessionSuccess(SessionData.data));        
      } 
      yield put(updateSessionSuccess());
      yield* hideLoader(false, '');
      navigation.goBack()
      yield showToast(gymSessions.message,'success')
    }else {
      yield put(updateSessionFail());
      yield* hideLoader(false, '');
      showToast(gymSessions.message, 'danger')

    }
  } catch (error) {
    yield put(updateSessionFail());
    yield* hideLoader(false, '');
    showToast(error.message, 'danger')

  }
}

function* sagaNearBySession() {
  yield takeEvery(ADD_SESSION_REQUEST, addSessionRequest);
  yield takeEvery(UPDATE_SESSION_REQUEST, updateSessionRequest);
  yield takeEvery(GET_SESSION_REQUEST, onSessionRequested);
}
export default sagaNearBySession;
