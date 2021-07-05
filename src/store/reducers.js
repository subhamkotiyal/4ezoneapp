import {combineReducers} from 'redux';
import loginReducer from './modules/login/reducer';
import loadingReducer from '_components/customeLoader/reducer';
import switchLanguage from './modules/languages/reducer';
import registerReducer from './modules/register/reducer';
import getProfileReducer from './modules/getProfile/reducer';
import changePReducer from './modules/changePassword/reducer';
import editPReducer from './modules/editProfile/reducer';
import resetotpReducer from './modules/verifyOTP/reducer';
import documentReducer from './modules/documents/reducer';
import trainerReducer from './modules/trainers/reducer';
import sessionsReducer from './modules/sessions/reducer';
import paymentDetailsReducer from './modules/paymentDetails/reducer';
import requestsReducer from './modules/requests/reducer';
import bookingReducer from './modules/booking/reducer';
import disputeReducer from './modules/dispute/reducer';
import earningsReducer from './modules/earnings/reducer';
import supportReducer from './modules/support/reducer';
import chemistsReducer from './modules/chemists/reducer';

import storage from '@react-native-community/async-storage';

export const logoutRequest = () => ({
  type: 'LOG_OUT',
});


const appReducer = combineReducers({
  loginReducer,
  loadingReducer,
  switchLanguage,
  resetotpReducer,
  registerReducer,
  getProfileReducer,
  changePReducer,
  editPReducer,
  documentReducer,
  trainerReducer,
  sessionsReducer,
  paymentDetailsReducer,
  requestsReducer,
  bookingReducer,
  disputeReducer,
  earningsReducer,
  supportReducer,
  chemistsReducer
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
  debugger;
  if (action.type === 'LOGOUT_REQUESTED') {
    let fcmToken;
    Object.keys(state).forEach(key => {
      if (key == 'loginReducer') {
        fcmToken = state[key].fcmToken;
      }
      storage.removeItem(`persist:${key}`);
    });
    state = Object.assign(
      {},
      {
        ...initialState,
        loginReducer: {...initialState.loginReducer, fcmToken: fcmToken},
      },
    );
  }
  return appReducer(state, action);
};

export default rootReducer;
