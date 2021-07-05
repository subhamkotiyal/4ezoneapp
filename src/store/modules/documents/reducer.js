import {
    DOCUMENT_ADD_REQUEST,
    DOCUMENT_UPDATE_REQUEST,
    DOCUMENT_LIST_REQUEST,
    DOCUMENT_ADD_SUCCESS,
    DOCUMENT_UPDATE_SUCCESS,
    DOCUMENT_LIST_SUCCESS,
    DOCUMENT_FAILURE,
  } from './types';
  
  const INITIAL_STATE = {
    data: null,
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case DOCUMENT_ADD_REQUEST:
        return {
          ...state,
        };
      case DOCUMENT_UPDATE_REQUEST:
        return {
          ...state,
        };
      case DOCUMENT_LIST_REQUEST:
        return {
          ...state,
        };
      case DOCUMENT_ADD_SUCCESS:
        return {
          ...state,
          data: action.data,
        };
      case DOCUMENT_UPDATE_SUCCESS:
        return {
          ...state,
          data: action.data,
        };
      case DOCUMENT_LIST_SUCCESS:
        return {
          ...state,
          data: action.data,
        };
      case DOCUMENT_FAILURE:
        return {
          ...state,
        };
      default:
        return state;
    }
  };
  