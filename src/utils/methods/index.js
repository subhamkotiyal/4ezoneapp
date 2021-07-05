import { showMessage, hideMessage } from "react-native-flash-message";
import {takeEvery, put} from 'redux-saga/effects';

import { hideLoading, showLoading } from '../../components/customeLoader/action';


export function* hideLoader(isError, errorMessage) {
  yield put(hideLoading(isError, errorMessage));
}
export function* showLoader(silentFetch) {
  if (!silentFetch) {
    yield put(showLoading());
  }
}

export const showToast = (message, type) => showMessage({
  message: `${message}`,
  type: type,
  icon: 'auto'
});


export const hideToast = (message, type) => showMessage({
  message: `${message}`,
  type: type,
  icon: 'auto'
});


// First Letter capital  
export const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}