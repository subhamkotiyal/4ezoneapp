import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import {Text, Button, Label, SmallIcon, Header} from '_atoms';
import {Line} from '_molecules';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';

const AcceptRequest = ({navigateToScreen}) => {
  return (<View
    style={{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: 'transparent',
    }}>
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: '#000000',
        opacity: 0.9,
      }}></View>

    <View
      style={{
        backgroundColor: '#ffffff',
        borderRadius:2,
        width: wp('80%'),
        height: wp('60%'),
        alignItems: 'center',
      }}>
      <Text
        style={{
          width: 'auto',
          fontFamily: 'CharlieDisplay-Semibold',
          textAlign: 'center',
          color: 'black',
          marginHorizontal: 20,
          marginTop: 50,
          fontSize: wp('5.33%'),
        }}>
        {' '}
        You have accepted an appointment.{' '}
      </Text>

      <TouchableOpacity
          onPress={() => navigateToScreen()}
          style={[
            {
            //   marginHorizontal: moderateScale(64),
              marginTop: 40,
              borderRadius:moderateScale(16),
              paddingHorizontal:scale(52),
              justifyContent:'center',
              alignItems:'center',
              height:moderateScale(32),
              backgroundColor:Colors.primary2,
            },
          ]}>
          <Text h6 style={AppStyles.buttonAletText}>
            OK
          </Text>
        </TouchableOpacity>
    </View>
    
  </View>
  )
                
}


export default AcceptRequest