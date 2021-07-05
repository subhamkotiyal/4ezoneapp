import {all} from 'redux-saga/effects';
import sagaLogin from './modules/login/saga';
import sagaRegister from './modules/register/saga';
import sagaVerifyOtp from './modules/verifyOTP/saga';
import sagaProfile from './modules/getProfile/saga';
import sagaChangeP from './modules/changePassword/saga';
import sagaEditProfile from './modules/editProfile/saga';
import sagaDocuments from './modules/documents/saga';
import sagaTrainers from './modules/trainers/saga';
import sagaSessions from './modules/sessions/saga';
import sagaPaymentDetails from './modules/paymentDetails/saga';
import sagaCurrentRequests from './modules/requests/saga';
import sagaBooking from './modules/booking/saga';
import sagaDispute from './modules/dispute/saga';
import sagaEarnings from './modules/earnings/saga';
import sagaSupport from './modules/support/saga';
import sagaChemist from './modules/chemists/saga';

export default function* rootSaga() {
  yield all([
    sagaLogin(),
    sagaVerifyOtp(),
    sagaRegister(),
    sagaProfile(),
    sagaChangeP(),
    sagaEditProfile(),
    sagaDocuments(),
    sagaTrainers(),
    sagaSessions(),
    sagaPaymentDetails(),
    sagaCurrentRequests(),
    sagaBooking(),
    sagaDispute(),
    sagaEarnings(),
    sagaSupport(),
    sagaChemist()
  ]);
}
