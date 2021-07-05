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


const INITIAL_STATE = {
  sessions: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_SESSION_REQUEST:
      return {
        ...state,
      };
    case GET_SESSION_SUCCESS:
      return {
        ...state,
        sessions: action.data,
      };
  
    case GET_SESSION_FAILURE:
      return {
        ...state,
        sessions:[]
      };
    case ADD_SESSION_FAILURE:
      return {
        ...state,
      };
    case ADD_SESSION_SUCCESS:
      return {
        ...state,
      };
    case UPDATE_SESSION_FAILURE:
      return {
        ...state,
      };
    case UPDATE_SESSION_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};
