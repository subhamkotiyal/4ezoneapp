import {takeEvery,select, put} from 'redux-saga/effects';

import {
  GET_NERBY_CHEMIST_REQUEST,
  GET_NERBY_CHEMIST_SUCCESS,
  GET_NERBY_CHEMIST_FAILURE,
} from './types';
import {getNearbyChemistSuccess, getNearbyChemistFail} from './actions';

import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

function* onNearbyChemistRequested({apiName,data,cb}) {


  yield* showLoader(false);
  try {
    const ChemistData = yield Request.post(apiName,data);
    if (ChemistData.status === SUCCESS) {
      //set data in redux pagination
      yield put(getNearbyChemistSuccess(ChemistData.data));
      yield* hideLoader(false, '');
      //return cb(ChemistData.data)

    } else {
      yield put(getNearbyChemistFail());
      yield* hideLoader(false, '');
      showToast(ChemistData.message,'danger')
    }
    yield* hideLoader(false, '');

  } catch (error) {
    yield put(getNearbyChemistFail());
    yield* hideLoader(false, '');
    showToast(error.message,'danger')
  }
}


function* sagaNearByChemist() {
  yield takeEvery(GET_NERBY_CHEMIST_REQUEST, onNearbyChemistRequested);
}
export default sagaNearByChemist;
