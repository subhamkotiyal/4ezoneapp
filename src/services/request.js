import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useRef, useEffect} from 'react';
import {Alert, View} from 'react-native';
import AxiosInstance from './Intercepter';
import {StackActions} from '@react-navigation/native';

// Middleware Axios services
import {dispatch} from '../store';
import {logoutRequest} from '../store/modules/login/actions';

import config from '../config';
import {useDispatch, useSelector} from 'react-redux';
//Post Request
//Post Request
export async function post(api, data) {
  return AxiosInstance.post(`${config.API_URL}${api}`, data)
    .then(res => {
      if (res.data && res.data.message == 'Not Authorized') {
        checkUserNotAuthorised({...res, status: 401});
      }
      return res.data;
    })
    .catch(err => (err && err.response ? err.response : err));
}

//Get Request
export async function get(api, data) {
  debugger;
  return AxiosInstance.get(`${config.API_URL}${api}`)
    .then(res => {
      if (res.data && res.data.message == 'Not Authorized')
        checkUserNotAuthorised({...res, status: 401});
      else if (res.status == 200 && !res.data.status) {
        return {
          ...res.data,
          status: 'success',
        };
      }
      return res.data;
    })
    .catch(err => err);
}
export async function getWebView(api, data) {
  debugger;
  return AxiosInstance.get(`${config.API_URL}${api}`)
    .then(res => {
      if (res.status == 200 && !res.data.status) {
        return {
          data: res.data,
          status: 'success',
        };
      }
      return res.data;
    })
    .catch(err => err);
}
//Put Request
export async function put(api, data) {
  return AxiosInstance.put(`${config.API_URL}${api}`, data)
    .then(res => res.data)
    .catch(err => err.response);
}

//Delete Request
export async function deleteRequest(api, data) {
  return AxiosInstance.delete(`${config.API_URL}${api}`, data)
    .then(res => res.data)
    .catch(err => err.response);
}

//Get All Request
export async function getAll(data) {
  debugger;
  return Promise.all(data)
    .then(values => {
      debugger;
      return values;
    })
    .catch(err => {
      debugger;
      return err;
    });
}

// Get Token
export async function getAccessTokenFromCookies() {
  return new Promise(async (resolve, reject) => {
    let token = await AsyncStorage.getItem('token');
    if (token) {
      resolve(token);
    } else {
      reject(true);
    }
  });
}
// Get Language
// Get Language
const checkUserNotAuthorised = res => {
  console.log(res, '00000000');
  if (res.data && res.data.message == 'Not Authorized') {
    dispatch(logoutRequest());
    setTimeout(() => {
      dispatch(StackActions.replace('Auth', {}));
    });
  }
};
