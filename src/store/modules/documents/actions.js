import {
  DOCUMENT_ADD_REQUEST,
  DOCUMENT_UPDATE_REQUEST,
  DOCUMENT_LIST_REQUEST,
  DOCUMENT_ADD_SUCCESS,
  DOCUMENT_UPDATE_SUCCESS,
  DOCUMENT_LIST_SUCCESS,
  DOCUMENT_FAILURE,
} from './types';

export const documentAddRequest = (apiName,data, navigation,cb) => ({
  type: DOCUMENT_ADD_REQUEST,
  apiName,
  data,
  navigation,
  cb
});

export const documentUpdateRequest = (apiName,data, navigation,cb) => ({
  type: DOCUMENT_UPDATE_REQUEST,
  apiName,
  data,
  navigation,
  cb
});

export const documentListRequest = (data, navigation) => ({
  type: DOCUMENT_LIST_REQUEST,
  data,
  navigation,
});

export const documentAddSuccess = data => ({
  type: DOCUMENT_ADD_SUCCESS,
  data,
});
export const documentUpdateSuccess = data => ({
  type: DOCUMENT_UPDATE_SUCCESS,
  data,
});
export const documentListSuccess = data => ({
  type: DOCUMENT_LIST_SUCCESS,
  data,
});
export const documentFail = () => ({
  type: DOCUMENT_FAILURE,
});
