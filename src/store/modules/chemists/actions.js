import {
  GET_NERBY_CHEMIST_REQUEST,
  GET_NERBY_CHEMIST_SUCCESS,
  GET_NERBY_CHEMIST_FAILURE,
} from './types';

export const  getNearbyChemistRequest= (apiName,data,cb) => ({
  type: GET_NERBY_CHEMIST_REQUEST,
  apiName,
  data,
  cb:cb
});

export const  getNearbyChemistSuccess = data => ({
  type: GET_NERBY_CHEMIST_SUCCESS,
  data,
});
export const  getNearbyChemistFail = () => ({
  type: GET_NERBY_CHEMIST_FAILURE,
});
