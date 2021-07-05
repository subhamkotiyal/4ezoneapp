import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Text, Button, TextInput, Header } from '_atoms'
import { BottomAbsoluteButton } from '_molecules'
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { Validation, Methods } from '_utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { forgotRequest } from '../../../store/modules/changePassword/actions';

let {boxShadow, padding } = Mixins


// Component 
const ForgotEmail = ({ navigation }) => {

  /****************************** Get Store State & Hooks*************************************/
  const dispatch = useDispatch()

  let emailField
  const [state, setState] = useState({});
/****************************** Validation *************************************/
    const ValidationRules = () => {
      let { email = '',  } = state;
      return [
        {
          field: email,
          name: 'Email',
          rules: 'required|email|no_space',
          lang: 'en'
        },

      ];
  
    };
  
/****************************** API Function *************************************/
  const pressButton = () => {
    let {  email = '' } = state;
    let validation = Validation.validate(ValidationRules());
    let { showToast } = Methods
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger')
    }else {
      let data = {
      email:email,
    };
      dispatch(forgotRequest(data, navigation))
    }
  }
  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  /****************************** Render Main  *************************************/
  return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
      <Header
      leftText
      style={[boxShadow('trasparent',{},0)]}
      title={'Forgot email'}
      textStyle={{textAlign:'center'}}
      />
    <ScrollView contentContainerStyle={[padding(24),
      {backgroundColor:'white'}]}
     keyboardShouldPersistTaps={'never'}>

   <View style={{ flex: 0.5, marginTop: moderateScale(4) }}>
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
          isFocused={state.emailFieldFocus}
          leftIcon={Images.mailLight}
          viewTextStyle={[AppStyles.viewTextStyle,{
            borderRadius:moderateScale(48)/8
          }]}
          underlineColorAndroid="transparent"
          onFocus={() => handleChange(true, 'emailFieldFocus')}
          onBlur={() => handleChange(false, 'emailFieldFocus')}
          onChangeText={(text) => handleChange(text, 'email')}
          onSubmitEditing={event => {
            Keyboard.dismiss()
          }}
        />
       </View>
    </ScrollView>
    <BottomAbsoluteButton 
    onPress={()=>pressButton()}
    image={Images.tick}/>

  </View>
}

export default ForgotEmail;