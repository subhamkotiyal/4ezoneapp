import React, {useState, useRef, useEffect} from 'react';
import {View, TouchableOpacity, ImageBackground} from 'react-native';
import {Text, Button, TextInput, SmallIcon, Header} from '_atoms';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons'
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {moderateScale} from 'react-native-size-matters';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;

const ProfileView = ({
  nameStyle,
  mainStyle,
  user = {},
  onOpenImage,
  fromEdit,
}) => {
  return (
    <View
      style={[
        {
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: windowHeight / 24,
          justifyContent: 'center',
          backgroundColor: 'transparent',
        },
        mainStyle && mainStyle,
      ]}>
      <View
        style={{
          borderRadius: 16,
          borderColor: 'white',
          borderWidth:1,
          height: moderateScale(96),
          width: moderateScale(96),
        }}>
        <ImageBackground
          source={
              user &&  user.profileImage && user.profileImage != 'null' 
              ? {uri: user.profileImage}
              : Images.notfound2
          }
          resizeMode={'cover'}
          imageStyle={{borderRadius: 16}}
          style={{
            borderRadius: 16,
            height: '100%',
            width: '100%',
            borderColor: 'white',
          }}>
          <LinearGradient
            style={{flex: 1, 
              borderWidth:1,
              borderColor: 'white',
              borderRadius: 16}}
            colors={[
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.1)',
            ]}></LinearGradient>
        </ImageBackground>
      </View>

      {!fromEdit && (
        <View style={{paddingTop: 8}}>
          <Text h6 
          style={[AppStyles.topTitle, nameStyle && nameStyle]}>
            {user.name}{' '}
          </Text>
        </View>
      )}
      {fromEdit && (
        <TouchableOpacity
          hitSlop={{right: 50, left: 50, top: 50, bottom: 50}}
          onPress={() => onOpenImage && onOpenImage()}
          style={{
            position: 'absolute',
            bottom: 0,
            right: 8,
          }}>
          <Ionicons
            name={'md-camera'}
            size={24}
            color={'white'}
        //     style={{
        //       height: moderateScale(28),
        //       width: moderateScale(29),
        //     }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
export default ProfileView;
