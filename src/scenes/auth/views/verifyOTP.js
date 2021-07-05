import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, Keyboard, Image, ScrollView, AppStylesheet } from 'react-native';
import { Text, Button, Header, TextInput, SmallIcon } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images, Methods } from '_utils'
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import { AuthButton } from '../templates'
import { useDispatch, useSelector } from "react-redux";
import Config from '_utils/constants/apiConstant';

import { Typography, Colors, Mixins, AppStyles } from '_styles';
let { padding, boxShadow, margin } = Mixins
import { resetRequest } from '../../../store/modules/verifyOTP/actions';

// Component 
const VerifyOtp = ({ navigation, route }) => {

/****************************** Get Store State & Hooks*************************************/
    let pinInputRef;
    pinInputRef = React.createRef();
    const [state, setState] = useState({ code: '' });
    const dispatch = useDispatch()
    const { resetData} = useSelector(state => ({
        resetData: state.resetotpReducer.resetData,
    }));
    
/****************************** API Function *************************************/
    const onResendCode = () => {
        let { email } = route.params;
        let data ={}
        data['email'] =email
        dispatch(resetRequest(data))
    }
    const goToNextScreen = () => {
        let { showToast } = Methods
         const { otp,email} = route.params;
        const { code } = state
        if ((resetData && (code == resetData.OTP)) || code == otp) {
            navigation.navigate('ForgotPassword', {
                email: email,
                otp: code,
            });
        } else {
            setState({ code: '' })
            showToast('Please enter valid OTP', 'danger');
        }
    };

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
            image={Images.back}
            onPressLeft={() => navigation.goBack()}
            style={[boxShadow('trasparent', {}, 0), padding(0)]}
            title={'Verify OTP'}
            textStyle={{ textAlign: 'center' }}
        />
        <ScrollView contentContainerStyle={[padding(16, 16, 0, 16),]}
            keyboardShouldPersistTaps={'never'}
            style={{ backgroundColor: Colors.white }}>

            {/********************** OTP Heading  *************************/}

            <View style={[AppStyles.gridViewBackground,{backgroundColor:Colors.white}]}>
                <View style={AppStyles.otpHeading}>
                    <Text style={AppStyles.otpText}>{'Enter the 4-digit code sent to you at'}</Text>
                    <Text h6 style={{
                        fontSize: Typography.normalize(14),
                        color: Colors.black,
                        lineHeight: 25
                    }}>
                        {`${route.params.email}`}
                    </Text>
                </View>
                {/********************** OTP Input  *************************/}

                <View style={[AppStyles.otp,{backgroundColor:Colors.white}]}>
                    <SmoothPinCodeInput
                        ref={(ref) => pinInputRef = ref}
                        cellStyle={{
                            borderBottomWidth: 2,
                            borderColor: 'rgba(0,0,0,0.1)',
                        }}
                        cellStyleFocused={{
                            borderColor: Colors.primary,
                        }}
                        textStyleFocused={{
                            color: Colors.textColor,
                            color: 'rgba(0,0,0,1)',

                        }}
                        textStyle={{
                            color: 'rgba(0,0,0,0.5)',
                            fontSize: Typography.normalize(24)

                        }}
                        keyboardType="numeric"
                        value={state.code}
                        placeholder={'0'}
                        onTextChange={code => handleChange(code, 'code')}
                    />
                </View>
            </View>


        </ScrollView>
        {/**************** Back To Login  *******************/}
        <BottomAbsoluteButton image={Images.next}
            onPress={() => goToNextScreen()}
        />
        <View style={{
            justifyContent: 'center',
            flex: 1,
        }}>
            <AuthButton
                title={'Resend Code'}
                transparent={true}
                buttonTextStyle={{
                    fontSize: Typography.normalize(18),
                    fontWeight: '500',
                    color: '#EE5F58'
                }}
                pressButton={() => onResendCode()}
            />
        </View>

    </View>
}

export default VerifyOtp;

