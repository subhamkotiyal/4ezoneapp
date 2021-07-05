import AsyncStorage from '@react-native-community/async-storage';
import {takeEvery, put} from 'redux-saga/effects';
import {GETPROFILE_REQUEST,ONLINE_OFFILNE_REQUEST} from './types';
import {profileSuccess, profileFail,
   changeOnlineOfflineSuccess, changeOnlineOfflineFail,} from './actions';
import {NavigationActions, StackActions} from  '@react-navigation/native';
import {
  showLoader,
  showToast,
  hideLoader,
} from '_utils/methods';
import Config, { SUCCESS } from '_utils/constants/apiConstant';
import { Request } from '_services'
import {loginSuccess} from '../login/actions';

function* onProfileRequested({navigation}) {
  yield* showLoader(false);
  try {
    const profileData = yield Request.get(Config.profile);
    if (profileData.data.status === SUCCESS) {
      yield put(loginSuccess(profileData.data.data));
      yield put(profileSuccess(profileData.data.data));
      yield* hideLoader(false, '');
      navigation.navigate('App');
    } else {
      yield put(profileFail());
      yield* hideLoader(false, '');
      setTimeout(() => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({routeName: Config.SideMenu})],
        });
        navigation.dispatch(resetAction);
      }, 600);
    }
  } catch (error) {
    // console.log(JSON.stringify(error));
    yield* hideLoader(false, '');
    setTimeout(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: Config.Login})],
      });
      navigation.dispatch(resetAction);
    }, 800);
    yield put(profileFail());
  }
}

function* onChangeOnlineOfflineRequest({apiName,data,navigation}) {
  yield* showLoader(false);
  try {
    const accountData = yield Request.post(
      apiName,
      data,
    );
    debugger
    if (accountData.status === SUCCESS) {
      yield put(changeOnlineOfflineSuccess());
      yield put(loginSuccess(accountData.data));
      yield put(profileSuccess(accountData.data));
      yield* hideLoader(false, '');
    } else {
      yield* hideLoader(false, '');
      yield put(changeOnlineOfflineFail());
      showToast(accountData.message,'danger')
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    yield* hideLoader(false, '');
    yield put(changeOnlineOfflineFail());
    showToast(error.message,'danger')
  }
}



function* sagaProfile() {
  yield takeEvery(GETPROFILE_REQUEST, onProfileRequested);
  yield takeEvery(ONLINE_OFFILNE_REQUEST, onChangeOnlineOfflineRequest);

}
export default sagaProfile;
