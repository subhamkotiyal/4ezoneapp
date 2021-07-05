import {
  GET_SESSION_REQUEST,
  GET_SESSION_SUCCESS,
  GET_SESSION_FAILURE,
  ADD_SESSION_FAILURE,
  ADD_SESSION_REQUEST,
  ADD_SESSION_SUCCESS,
  UPDATE_SESSION_FAILURE,
  UPDATE_SESSION_REQUEST,
  UPDATE_SESSION_SUCCESS
} from './types';

export const getSessionRequest= (apiName,data) => ({
  type: GET_SESSION_REQUEST,
  apiName,
  data,
});
export const getSessionSuccess = data => ({
  type: GET_SESSION_SUCCESS,
  data,
});
export const getSessionFail = () => ({
  type: GET_SESSION_FAILURE,
});


export const addSessionRequest= (addApi,data,navigation,getApi) => ({
  type:ADD_SESSION_REQUEST,
  addApi,
  data,
  navigation,
  getApi
});
export const addSessionSuccess = data => ({
  type:ADD_SESSION_SUCCESS,
  data,
});
export const addSessionFail = () => ({
  type: ADD_SESSION_FAILURE,
});

export const updateSessionRequest= (addApi,data,navigation,getApi) => ({
  type:UPDATE_SESSION_REQUEST,
  addApi,
  data,
  navigation,
  getApi
});
export const updateSessionSuccess = data => ({
  type:UPDATE_SESSION_SUCCESS,
  data,
});
export const updateSessionFail = () => ({
  type: UPDATE_SESSION_FAILURE,
});
