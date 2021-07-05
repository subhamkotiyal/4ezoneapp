import {takeEvery, put} from 'redux-saga/effects';
import {
  GET_TRAINER_REQUEST,
  DELETE_TRAINER_REQUEST,
  ADD_TRAINER_REQUEST
} from './types';
import {getTrainerFail,getTrainerSuccess, addTrainerSuccess,addTrainerFail,
  deleteTrainerFail,deleteTrainerSuccess} from './actions';

import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'

function* onTrainerRequested({data}) {
  yield* showLoader(false);
  try {
    const trainerData = yield Request.get(`${Config.getGymTrainers}${data._id}`);
    debugger
    if (trainerData.status === SUCCESS) {
      yield put(getTrainerSuccess(trainerData.data));
      yield* hideLoader(false, '');
    } else {
      yield put(getTrainerFail());
      yield* hideLoader(false, '');
      showToast(trainerData.message, 'danger')

    }
  } catch (error) {
    yield put(getTrainerFail());
    showToast(error.message, 'danger')
    yield* hideLoader(false, '');
  }
}


function* addTrainerRequest({data,navigation,gymId}) {
  yield* showLoader(false);
  try {
    const gymTrainers = yield Request.post(`${Config.addGymTrainer}`,data);
    debugger
    if (gymTrainers.status === SUCCESS) {
      const trainerData = yield Request.get(`${Config.getGymTrainers}${gymId}`);
      if (trainerData.status === SUCCESS) {
        yield put(getTrainerSuccess(trainerData.data));        
      }      
     yield put(addTrainerSuccess());
      yield* hideLoader(false, '');
      navigation.goBack()
    }else {
      yield put(addTrainerFail());
      yield* hideLoader(false, '');
      showToast(gymTrainers.message, 'danger')

    }
   
  } catch (error) {
    showToast(error.message, 'danger')

    yield put(addTrainerFail());
    yield* hideLoader(false, '');
  }
}

function* deleteTrainerRequest({data,navigation}) {
  yield* showLoader(false);
  try {
    const gymTrainers = yield Request.get(`${Config.deleteGymTrainer}/${data.trainerId}`);
    if (gymTrainers.status === SUCCESS) {
      const trainerData = yield Request.get(`${Config.getGymTrainers}${data._id}`);
      if (trainerData.status === SUCCESS) {
        yield put(getTrainerSuccess(trainerData.data));        
      } 
      yield put(deleteTrainerSuccess());
      yield* hideLoader(false, '');
    }else {
      yield put(deleteTrainerFail());
      yield* hideLoader(false, '');
      showToast(trainerData.message, 'danger')

    }
   
  } catch (error) {
    yield put(deleteTrainerFail());
    yield* hideLoader(false, '');
    showToast(error.message, 'danger')

  }
}
function* sagaNearByTrainer() {
  yield takeEvery(ADD_TRAINER_REQUEST, addTrainerRequest);
  yield takeEvery(DELETE_TRAINER_REQUEST, deleteTrainerRequest);
  yield takeEvery(GET_TRAINER_REQUEST, onTrainerRequested);
}
export default sagaNearByTrainer;
