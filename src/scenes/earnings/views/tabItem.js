import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Keyboard,Text
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {ListEmptyComponent} from '_molecules';

let {boxShadow, padding, windowWidth, windowHeight} = Mixins;

export default TabItem = ({navigation, route, earningWebview}) => {
  return (
    <View
        style={[padding(16, 16, 8, 16),{
          flex:1,backgroundColor: Colors.white
        }]}
        keyboardShouldPersistTaps={'never'}
        scrollEnabled={false}
       >
        <View style={{height: verticalScale(16)}} />
            {earningWebview()}
      </View>
  );
};
