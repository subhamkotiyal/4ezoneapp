import {
  GET_NERBY_CHEMIST_REQUEST,
  GET_NERBY_CHEMIST_SUCCESS,
  GET_NERBY_CHEMIST_FAILURE,
} from './types';


const INITIAL_STATE = {
  nearbyChemist: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_NERBY_CHEMIST_REQUEST:
      return {
        ...state,
        nearbyChemist:[]
      };
    case GET_NERBY_CHEMIST_SUCCESS:
      debugger
      return {
        ...state,
        nearbyChemist: action.data,
      };
    case GET_NERBY_CHEMIST_FAILURE:
      return {
        ...state,
        nearbyChemist:[]
      };
    default:
      return state;
  }
};
