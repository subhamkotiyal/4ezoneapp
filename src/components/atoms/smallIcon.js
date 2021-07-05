import React, {Component} from 'react';
import {View, Image} from 'react-native';
import Modal from 'react-native-modal';
import {AppStyles} from '_styles';
import {moderateScale, scale} from 'react-native-size-matters';

const SmallIcon = ({source, style}) => {
  return (
    <View>
      <Image
        source={source}
        resizeMode={'contain'}
        style={[
          {height: scale(16), width: scale(16), alignSelf: 'center'},
          style && style,
        ]}
      />
    </View>
  );
};
export default SmallIcon;
