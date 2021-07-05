import axios from 'axios'
import config from "../config";
import {getStore}  from '../store'
import { FAILURE } from '_utils/constants/apiConstant';

// Create Instance
const AxiosInstance = axios.create({
    baseURL: config.API_URL,
    timeout: 20000,
    transformRequest: [function (data, headers) {
       let {language} = getStore().getState().switchLanguage
       let {loginData} = getStore().getState().loginReducer
       let {registerData} = getStore().getState().registerReducer
        headers['locale'] =language.code
        if(loginData && loginData.token){
            headers['token'] = `${loginData.token}`
            headers['doctorid'] = `${loginData._id}`
        }
        if(data && data._parts){
            return data
        }else{
            return JSON.stringify(data)
        }
      }],
    headers:{'Content-Type': 'application/json',}
})

// Response Interceptor
AxiosInstance.interceptors.response.use((response) =>{
    debugger
    return response;
}, (error) => {
    debugger
    const originalRequest = error.config;
    console.log(`...........=====================responce ==>`,JSON.stringify(error))
    if (!error.response) {
       return Promise.reject({
        status: FAILURE, 
        message:'Please check your internet connection'})
    }else {
        debugger
        return error.response
    }

})

export default AxiosInstance