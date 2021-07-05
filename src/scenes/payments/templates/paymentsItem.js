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

const PaymentsItem = ({item = {}, onPress, customeStyle, onRightPress}) => (
  <Card cardStyle={[styles.cardStyle, customeStyle && customeStyle]}>
    {/*******************  Request Profile View  ******************/}
    <View
      style={[
        AppStyles.row,
        {
          paddingVertical: verticalScale(8),
        },
      ]}>
      <View style={{flex: 0.2,paddingLeft:moderateScale(16)}}>
        <Image source={Images.bank} 
          resizeMode={'contain'}
        style={styles.leftImageStyle} />
      </View>

      <View style={[styles.leftSection]}>
        <Text
          h6
          style={[
            styles.profileText,
            {
              fontSize: Typography.normalize(18),
              textTransform: 'capitalize',
            },
          ]}>
          {item.bankName}
        </Text>
        <View style={[AppStyles.column, {paddingTop: 2}]}>
          {item.accountNumber && (
            <Text h6 style={[styles.profileText]}>
              {`${item.accountNumber.substring(
                0,
                2,
              )}********${item.accountNumber.substring(
                item.accountNumber.length - 2,
                item.accountNumber.length,
              )}`}
            </Text>
          )}
        </View>
      </View>

      {/******* Edit check  **********/}
      <TouchableOpacity
        onPress={() => onRightPress && onRightPress()}
        hitSlop={{left: 25, top: 25, bottom: 25, right: 25}}
        style={styles.rightStatus}>
        <SmallIcon
          source={Images.editcolor}
          style={{height: scale(16), width: scale(16)}}
        />
      </TouchableOpacity>
    </View>
  </Card>
);
export default PaymentsItem;

const styles = StyleSheet.create({
  datetime: {color: Colors.white, alignSelf: 'center'},
  cardStyle: {
    ...padding(0),
    ...margin(16, 16, 8, 16),
    ...boxShadow('black', {height: 1, width: 0}, 5, 0.05),
    borderRadius: moderateScale(8),
  },
  profileText: {
    color: Colors.lightblack,
    fontSize: Typography.normalize(14),
  },
  imageStyle: {height: moderateScale(12), width: moderateScale(12)},
  leftSection: {
    flex: 0.7,
    paddingLeft: moderateScale(8),
    justifyContent: 'center',
  },
  rightStatus: {
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(4),
    flex: 0.1,
  },
  leftImageStyle: {height: scale(48), width: scale(48)},
});
