
import React from 'react';
import {
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Image,
} from 'react-native';
import { Mixins, Colors, AppStyles, Typography } from '_styles'
import { verticalScale, moderateScale, scale } from 'react-native-size-matters';

export default  BottomAbsoluteButton = ({image,onPress,customeStyle})=>{
    return <TouchableOpacity 
    onPress={()=> onPress && onPress()}
    style={[{
    height:moderateScale(56),width:moderateScale(56),
    position:'absolute',
    bottom:16,right:moderateScale(16),
    justifyContent:'center',
    zIndex:100,
    borderRadius:moderateScale(56)/2,
    backgroundColor:Colors.primary},customeStyle && customeStyle]}>
     <Image source={image}
     resizeMode={'contain'}
      style={{alignSelf:'center',width:'100%',height:'100%'}}/>
    </TouchableOpacity>
}