import {
  GET_TRAINER_REQUEST,
  GET_TRAINER_SUCCESS,
  GET_TRAINER_FAILURE,
  ADD_TRAINER_SUCCESS,
  DELETE_TRAINER_SUCCESS,
  ADD_TRAINER_FAILURE,
  DELETE_TRAINER_FAILURE,
} from './types';

const INITIAL_STATE = {
  trainers: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TRAINER_REQUEST:
      return {
        ...state,
      };
    case GET_TRAINER_SUCCESS:
      return {
        ...state,
        trainers: action.data,
      };
    case GET_TRAINER_FAILURE:
      return {
        ...state,
      };
    case GET_TRAINER_FAILURE:
      return {
        ...state,
      };
    case ADD_TRAINER_FAILURE:
      return {
        ...state,
      };
    case ADD_TRAINER_SUCCESS:
      return {
        ...state,
      };
    case DELETE_TRAINER_FAILURE:
      return {
        ...state,
      };
    case DELETE_TRAINER_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
};
