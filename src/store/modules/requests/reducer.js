import {
  GET_REQUESTS_SUCCESS,
  GET_REQUESTS_REQUEST,
  GET_REQUESTS_FAILURE,
  ADD_ACCEPT_REJECT_SUCCESS,
  ADD_ACCEPT_REJECT_FAILURE,
  ADD_ACCEPT_REJECT_REQUEST,
} from './types';

const INITIAL_STATE = {
  currentRequests: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_REQUESTS_REQUEST:
      return {
        ...state,
      };
    case GET_REQUESTS_SUCCESS:
      return {
        ...state,
        currentRequests: action.data,
      };
    case GET_REQUESTS_FAILURE:
      return {
        ...state,
        currentRequests:[]
      };
      
    case ADD_ACCEPT_REJECT_REQUEST:
      return {
        ...state,
      };
    case ADD_ACCEPT_REJECT_FAILURE:
      return {
        ...state,
      };
    case ADD_ACCEPT_REJECT_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
