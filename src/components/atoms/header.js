import React from 'react';
import {TouchableOpacity, Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {Text} from '_atoms';
import {Images} from '_utils';
import {Mixins, Typography, Colors, AppStyles} from '_styles';
import {useNavigation} from '@react-navigation/native';
import SmallIcon from './smallIcon';
import {moderateScale, scale} from 'react-native-size-matters';
let {margin, boxShadow, scaleSize, windowHeight} = Mixins;

const Header = props => {
  const navigation = useNavigation();
  const {
    textColor,
    alignSelf,
    rightImage,
    rightText,
    leftText,
    image,
    rightStyle,
    onPressRight,
    onPressLeft,
  } = props;
  return (
    <View
      style={[
        boxShadow('black'),
        styles.container,
        props.style && props.style,
        {},
      ]}>
      {/************* leftText or Left Icon ***************/}
      {(leftText || image) && (
        <TouchableOpacity
          onPress={() => (onPressLeft ? onPressLeft() : navigation.goBack())}
          hitSlop={{left:30,top:30,right:30,bottom:30}}
          style={{
            flex: 0.1,
            alignSelf: alignSelf ? 'center' : 'center',
          }}>
          <Image 
          style={{height:moderateScale(24),width:24,alignSelf:'center'}}
          resizeMode={'contain'}
          source={image ? image : Images.back} />
        </TouchableOpacity>
      )}

      {/*************  Title  ***************/}
      <View style={{alignSelf: 'center', flex: 0.8, justifyContent: 'center'}}>
        <Text
          h5
          style={[
            {
              color: Colors.black,
              ...props.textStyle,
            },
          ]}>
          {props.title}
        </Text>
      </View>

      {/*********************  Right Text  ***********************/}
      {(rightText || rightImage) && (
        <TouchableOpacity
          disabled={rightText}
          onPress={() => onPressRight && onPressRight()}
          style={[
            {
              flex: 0.1,
              alignSelf: 'center',
            },
            rightStyle && rightStyle,
          ]}>
          {rightText && rightImage ? (
            <Text
              h5
              style={[
                {
                  fontSize: Typography.normalize(14),
                  paddingTop: moderateScale(4),
                  marginRight: 8,
                  color: Colors.black,
                },
              ]}>
              {rightText}
            </Text>
          ) : null}
          <TouchableOpacity
          style={{paddingTop:2,justifyContent:'center',alignItems:'center'}}
            hitSlop={{left:30,top:30,right:30,bottom:30}}
           onPress={() => onPressRight && onPressRight()}>
             <Image
            resizeMode={'contain'}
            style={{alignSelf:'center',height: scale(24), width: scale(24)}}
            source={rightImage ? rightImage : Images.back}
          />
          </TouchableOpacity>
         
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = {
  container: {
    backgroundColor: 'white',
    height: moderateScale(52),
    flexDirection: 'row',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
    color: 'red',
    height: 18,
    width: 18,
    borderRadius: 18 / 2,
    backgroundColor: 'red',
    zIndex: 100,
    right: -10,
    bottom: 16,
  },
};
export default Header;
