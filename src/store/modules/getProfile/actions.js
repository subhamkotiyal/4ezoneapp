import {
  GETPROFILE_SUCCESS,
  GETPROFILE_REQUEST,
  GETPROFILE_FAILURE,

  ONLINE_OFFILNE_FAILURE,
  ONLINE_OFFILNE_REQUEST,
  ONLINE_OFFILNE_SUCCESS
} from './types';

export const profileRequest = navigation => ({
  type: GETPROFILE_REQUEST,
  navigation,
});

export const profileSuccess = data => ({
  type: GETPROFILE_SUCCESS,
  data,
});
export const profileFail = () => ({
  type: GETPROFILE_FAILURE,
});


export const changeOnlineOfflineRequest = (apiName,data,navigation) => ({
  type: ONLINE_OFFILNE_REQUEST,
  apiName,
  data,
  navigation,
});

export const changeOnlineOfflineSuccess = data => ({
  type: ONLINE_OFFILNE_SUCCESS,
  data,
});
export const changeOnlineOfflineFail = () => ({
  type: ONLINE_OFFILNE_FAILURE,
});
