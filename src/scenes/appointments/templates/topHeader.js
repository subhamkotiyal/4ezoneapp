// src/components/Product.js
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import {Mixins, Typography, Colors, AppStyles} from '_styles';
let {margin, boxShadow, scaleSize, padding, windowHeight, windowWidth} = Mixins;
import {Text, Card, SmallIcon} from '_atoms';
import {Images} from '_utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
const TopHeader = ({item}) => {
  return (
    <View style={{paddingHorizontal: 24, paddingVertical: 16}}>
      <Text
        h6
        style={[
          {
            fontWeight: 'bold',
            color: Colors.black,
            fontSize: Typography.normalize(18),
          },
        ]}>
        {item.name}
      </Text>
      <Text
        p
        style={[
          {
            color: Colors.black,
          },
        ]}>
        {item.email}
      </Text>
      <Text p style={[{}]}>
        {`${item.mobileNumber}`}
      </Text>
    </View>
  );
};
export default TopHeader;
