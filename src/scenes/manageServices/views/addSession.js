import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Image, ScrollView, Keyboard } from 'react-native';
import { Text, Button, TextInput, SmallIcon, Header } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import {addSessionRequest,updateSessionRequest} from '../../../store/modules/sessions/actions';
import { Validation, Methods } from '_utils'
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import { Images } from '_utils'

import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow } = Mixins
import Config, { SUCCESS } from '_utils/constants/apiConstant';

// Component 
const AddSession = ({ navigation,route }) => {
    
/****************************** Get Store State & Hooks*************************************/
    const dispatch = useDispatch()
    let sessionNameField, priceField, additionalField;
    const [state, setState] = useState({
        ...route.params.itemDetail,
        mode:route.params.mode
    });
    const {user } = useSelector(state => ({
        user: state.getProfileReducer.profileData,
    }));
/****************************** Validation *************************************/
  const ValidationRules = () => {
    let {name = '', price = '',description=''} = state;
    let code = 'en';
    return [
      {
        field: name,
        name: 'Name',
        rules: 'required|no_space',
        lang: code,
      },
      {
        field: price,
        name: 'Price',
        rules: 'required|numeric',
        lang: code,
      },
      {
        field: description,
        name: 'Additional',
        rules: 'required',
        lang: code,
      }
    ];
  };
/****************************** API Function *************************************/
    const pressButton = () => {
        let {name = '', price = '',description='',mode} = state;
        let validation = Validation.validate(ValidationRules());
        let {showToast} = Methods;
        if (validation.length != 0) {
          showToast(validation[0].message, 'danger');
        }else{
            let data ={}
            data['name']=name
            data['description']=description
            data['price']=price
            if(mode =='update'){
                data['sessionId']=state._id
                if(user && user.role == 'trainer'){
                    data['trainerId']=user._id

                    dispatch(updateSessionRequest(`${Config.updateTrainerSession}`,data,navigation,`${Config.getTrainerSessions}${user._id}`))
                }else{
                    data['gymId']=user._id

                    dispatch(updateSessionRequest(`${Config.updateGymSession}`,data,navigation,`${Config.getGymSessions}${user._id}`))
                }
            }else{
                if(user && user.role == 'trainer'){
                    data['trainerId']=user._id

                    dispatch(addSessionRequest(`${Config.addTrainerSessions}`,data,navigation,`${Config.getTrainerSessions}${user._id}`))
                }else{
                    data['gymId']=user._id

                    dispatch(addSessionRequest(`${Config.addGymSession}`,data,navigation,`${Config.getGymSessions}${user._id}`))
                }
            }
        }
    }
/****************************** Function Main  *************************************/
    const handleChange = (value, name) => {
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    /****************************** Render Child Component  **************************/

    const RenderButton = ({ title, transparent }) => {
        return <View style={{
            justifyContent: 'center',
            paddingHorizontal:moderateScale(24),
            flex: 0.5
        }}>
            <Button onPress={() => pressButton()}
                title={title} />
        </View>
    }

    /****************************** Render Main  *************************************/
    return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
        <Header
            leftText
            image={Images.back}
            onPressLeft={() => navigation.goBack()}
            style={[boxShadow('trasparent', {}, 0)]}
            title={state.mode =='update' ?'Update Session':'Add Session'}
            textStyle={{ textAlign: 'center' }}
        />
        <ScrollView contentContainerStyle={[padding(8, 24, 8, 24),]}
            style={{backgroundColor: Colors.white}}
             keyboardShouldPersistTaps={'never'}>
                <View style={{ height: verticalScale(32) }} />

            <View style={{ flex: 1, }}>
                {/*************** Name field *******************/}
                <TextInput
                    label={''}
                    inputMenthod={input => {
                        sessionNameField = input;
                    }}
                    placeholder={'Session Name'}
                    placeholderTextColor="rgba(62,62,62,0.55)"
                    returnKeyType="next"
                    keyboardType="default"
                    autoCorrect={false}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    value={state.name}
                    leftIcon={Images.nameIcon}
                    viewTextStyle={[AppStyles.viewTextStyle, {
                        borderRadius: moderateScale(48) / 2
                      }]}
                     underlineColorAndroid="transparent"
                    isFocused={state.nameFieldFocus}
                    onFocus={() => handleChange(true, 'nameFieldFocus')}
                    onBlur={() => handleChange(false, 'nameFieldFocus')}
                    onChangeText={(text) => handleChange(text, 'name')}
                    onSubmitEditing={event => {
                        priceField.focus();
                    }}
                />
                <View style={{ height: verticalScale(24) }} />
                {/*************** Email field *******************/}
                <TextInput
                    label={''}
                    inputMenthod={input => {
                        priceField = input;
                    }}
                    placeholder={'Price'}
                    placeholderTextColor="rgba(62,62,62,0.55)"
                    returnKeyType="next"
                    keyboardType="numeric"
                    autoCorrect={false}
                    value={state.price?state.price.toString():''}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    leftIcon={Images.price}
                    viewTextStyle={[AppStyles.viewTextStyle, {
                        borderRadius: moderateScale(48) / 2
                      }]}
                      underlineColorAndroid="transparent"
                    isFocused={state.emailFieldFocus}
                    onFocus={() => handleChange(true, 'emailFieldFocus')}
                    onBlur={() => handleChange(false, 'emailFieldFocus')}
                    onChangeText={(text) => handleChange(text, 'price')}
                    onSubmitEditing={event => {
                        additionalField.focus();
                    }}
                />
                <View style={{ height: verticalScale(24) }} />



                {/*************** Contact field *******************/}
                <TextInput
                    label={''}
                    inputMenthod={input => {
                        additionalField = input;
                    }}
                    placeholder={'Additional'}
                    placeholderTextColor="rgba(62,62,62,0.55)"
                    returnKeyType="next"
                    keyboardType="default"
                    autoCorrect={false}
                    value={state.description}
                    autoCapitalize="none"
                    blurOnSubmit={false}
                    leftIcon={Images.additional}
                    isFocused={state.contactFieldFocus}
                    viewTextStyle={[AppStyles.viewTextStyle, {
                        borderRadius: moderateScale(48) / 2
                      }]}
                    underlineColorAndroid="transparent"
                    onFocus={() => handleChange(true, 'contactFieldFocus')}
                    onBlur={() => handleChange(false, 'contactFieldFocus')}
                    onChangeText={(text) => handleChange(text, 'description')}
                    onSubmitEditing={event => {
                        Keyboard.dismiss();
                    }}
                />
            </View>
        </ScrollView>
        <RenderButton title={state.mode =='update'?'Update':'Save'} />

    </View>
}

export default AddSession;