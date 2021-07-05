import {
  PROFILEIM_REQUESTED, PROFILE_REQUESTED, 
  PROFILEIM_UPLOADED, PROFILE_UPLOADED, 
  EDITPROFILE_FAIL,
  
} from './types';

export const profileImRequest = (apiName,profileData) => ({
  type: PROFILEIM_REQUESTED,
  apiName,
  profileData
});
export const profileRequest = (apiName,profileData, navigation) => ({
  type: PROFILE_REQUESTED,
  apiName,
  profileData,
  navigation
});

export const profileImSuccess = data => (
  {
      type: PROFILEIM_UPLOADED,
      data
  }
);
export const uploadProfileSuccess = (data) => ({
  type: PROFILE_UPLOADED,
  data
});

export const apiEPFail = () => (
  {
      type: EDITPROFILE_FAIL
  }
);
