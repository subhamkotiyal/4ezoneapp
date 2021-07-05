import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Text, Button, TextInput, Card } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Validation, Methods } from '_utils'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import {
  loginRequest,
} from '../../../store/modules/login/actions'

let { scaleSize, boxShadow, padding } = Mixins

import { LogoHeader, AuthButton } from '../templates';
import {logoutRequest} from '../../../store/modules/login/actions';
let initialState ={ email: "", password: "", emailFieldFocus: false, passwordFieldFocus: false }

// Component 
const Login = ({ navigation }) => {
  /****************************** Get Store State & Hooks*************************************/
  let emailField, passwordField;
  const dispatch = useDispatch()
  const [state, setState] = useState(initialState);
  const { language, user,fcmToken=null } = useSelector(state => ({
    user: state.loginReducer.mobileData,
    language: state.switchLanguage.language,
    fcmToken:state.loginReducer.fcmToken

  }));

//  useEffect(()=>{
//    dispatch(logoutRequest())
//  })
  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let { email = '', password = '' } = state;
    let { code } = language;
    return [
      {
        field: email,
        name: 'Email',
        rules: 'required|email|no_space',
        lang: code,
      },
      {
        field: password,
        name: 'Password',
        rules: 'required|no_space|min:6',
        lang: code
      }
    ];
  };

  /****************************** API Function *************************************/
  const pressButton = () => {
    let { email = '', password = '' } = state;
    let validation = Validation.validate(ValidationRules());
    let { showToast } = Methods
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger')
    } else {
      let data = {}
      data['email'] = email
      data['password'] = password
      data['firebaseToken'] = fcmToken
      dispatch(loginRequest(data,navigation))

    }
  }
  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  /****************************** Render Child Component  *************************************/

  const RenderButton = ({ title, transparent }) => {
    return <View style={{
      justifyContent: 'flex-end', flex: 0.5
    }}><AuthButton
        buttonStyle={{
        }}
        title={title}
        transparent={transparent}
        pressButton={pressButton}
      />
    </View>
  }

  /****************************** Render Main  *************************************/
  return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
    <ScrollView contentContainerStyle={[padding(24),]} 
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps={'never'}>
      <View style={{height:moderateScale(16)}} />
      <LogoHeader />
      {/*************** Label *******************/}
      <View style={{height:moderateScale(8)}} />

      <View style={[AppStyles.centerView,{
        marginTop:moderateScale(8)
      }]}>
        <Text h6 style={{fontFamily:Typography.FONT_FAMILY_REGULAR}}>Please! Login to continue</Text>
      </View>

      <View style={{ flex: 0.5, marginTop: moderateScale(24) }}>

        {/*************** Email field *******************/}
        <TextInput
          label={''}
          inputMenthod={input => {
            emailField = input;
          }}
          placeholder={'Email'}
          placeholderTextColor="rgba(62,62,62,0.55)"
          returnKeyType="next"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit={false}
          value={state.email}
          isFocused={state.emailFieldFocus}
          leftIcon={Images.mailLight}
          viewTextStyle={[AppStyles.viewTextStyle, {
            borderRadius: moderateScale(48) / 8
          }]}
          underlineColorAndroid="transparent"
          onFocus={() => handleChange(true, 'emailFieldFocus')}
          onBlur={() => handleChange(false, 'emailFieldFocus')}
          onChangeText={(text) => handleChange(text, 'email')}
          onSubmitEditing={event => {
            passwordField.focus();
          }}
        />
        <View style={{ height: verticalScale(24) }} />

        {/*************** Password field *******************/}
        <TextInput
          placeholder={'Password'}
          inputMenthod={input => {
            passwordField = input;
          }}
          placeholderTextColor="rgba(62,62,62,0.55)"
          selectionColor="#96C50F"
          returnKeyType="next"
          keyboardType="default"
          value={state.password}
          autoCorrect={false}
          autoCapitalize="none"
          blurOnSubmit={false}
          secureTextEntry
          leftIcon={Images.lock}
          viewTextStyle={[AppStyles.viewTextStyle, {
            borderRadius: moderateScale(48) / 8
          }]}
          isFocused={state.passwordFieldFocus}
          onFocus={() => handleChange(true, 'passwordFieldFocus')}
          onBlur={() => handleChange(false, 'passwordFieldFocus')}
          onChangeText={(text) => handleChange(text, 'password')}
          underlineColorAndroid="transparent"
          onSubmitEditing={event => {
            Keyboard.dismiss()

          }}
        />
      </View>
      <View style={{ height: verticalScale(24) }} />

      {/*************** Forgot Text *******************/}

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          setTimeout(()=> setState({...initialState}),400)
          navigation.navigate('ForgotEmail')}}
        style={{ alignItems: 'flex-end', flex: 1 }}
      >
        <View style={[AppStyles.forgotPassView, { alignItems: 'flex-start' }]}>
          <Text h6 style={[AppStyles.becomePartner,{color:Colors.primary}]}>
            {'Forgot Password'}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ height: verticalScale(32) }} />

      {/*************** Login Button *******************/}

      <RenderButton
        title={'Login'}
        transparnet={true}
      />

      <View style={{ height: verticalScale(72) }} />

      {/*************** Not have account Text *******************/}
      <View
        activeOpacity={0.5}
        style={[AppStyles.forgotPassView, { alignItems: 'center' }]}>
        <Text p style={[AppStyles.becomePartner, {
          color: 'rgba(0,0,0,0.6)'
        
        }]}>
          Don't have an account? <Text
                  onPress={() => navigation.navigate('Signup')}
          h6 style={[AppStyles.becomePartner, { color: 'rgba(0,0,0,0.9)' }]}> Sign up </Text>
        </Text>
      </View>
    </ScrollView>
  </View>
}

export default Login;