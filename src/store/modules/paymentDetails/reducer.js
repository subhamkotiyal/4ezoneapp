import {
  ADD_ACCOUNT_REQUEST,
  UPDATE_ACCOUNT_REQUEST,
  ADD_ACCOUNT_SUCCESS,
  UPDATE_ACCOUNT_SUCCESS,
  ACCOUNT_FAILURE,
} from './types';

const INITIAL_STATE = {
  addData: null,
  updateData: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ACCOUNT_REQUEST:
      return {
        ...state,
      };
    case UPDATE_ACCOUNT_REQUEST:
      return {
        ...state,
      };
    case ADD_ACCOUNT_SUCCESS:
      return {
        ...state,
        addData: action.data,
      };
    case UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        updateData: action.data,
      };
    case ACCOUNT_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
