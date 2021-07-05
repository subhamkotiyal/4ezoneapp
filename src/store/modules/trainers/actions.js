import {
  GET_TRAINER_REQUEST,
  GET_TRAINER_SUCCESS,
  GET_TRAINER_FAILURE,
  ADD_TRAINER_FAILURE,
  ADD_TRAINER_REQUEST,
  ADD_TRAINER_SUCCESS,
  DELETE_TRAINER_FAILURE,
  DELETE_TRAINER_REQUEST,
  DELETE_TRAINER_SUCCESS
} from './types';

export const getTrainerRequest= data => ({
  type: GET_TRAINER_REQUEST,
  data,
});
export const getTrainerSuccess = data => ({
  type: GET_TRAINER_SUCCESS,
  data,
});
export const getTrainerFail = () => ({
  type: GET_TRAINER_FAILURE,
});


export const addTrainerRequest= (data,navigation,gymId) => ({
  type:ADD_TRAINER_REQUEST,
  data,
  navigation,
  gymId
});
export const addTrainerSuccess = data => ({
  type:ADD_TRAINER_SUCCESS,
  data,
});
export const addTrainerFail = () => ({
  type: ADD_TRAINER_FAILURE,
});

export const deleteTrainerRequest= data => ({
  type:DELETE_TRAINER_REQUEST,
  data,
});
export const deleteTrainerSuccess = data => ({
  type:DELETE_TRAINER_SUCCESS,
  data,
});
export const deleteTrainerFail = () => ({
  type: DELETE_TRAINER_FAILURE,
});
