import {
  GET_DAY_EARNING_SUCCESS,
  GET_DAY_EARNING_REQUEST,
  GET_DAY_EARNING_FAILURE,
  GET_WEEK_EARNING_SUCCESS,
  GET_WEEK_EARNING_FAILURE,
  GET_WEEK_EARNING_REQUEST,
} from './types';


const INITIAL_STATE = {
  dayEarning: null,
  weekEarning:null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_WEEK_EARNING_REQUEST:
      return {
        ...state,
      };
    case GET_WEEK_EARNING_SUCCESS:
      return {
        ...state,
        weekEarning: action.data,
      };
    case GET_WEEK_EARNING_FAILURE:
      return {
        ...state,
      };
      
    case GET_DAY_EARNING_REQUEST:
      return {
        ...state,
        dayEarning:action.data
      };
    case GET_DAY_EARNING_FAILURE:
      return {
        ...state,
      };
    case GET_DAY_EARNING_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
