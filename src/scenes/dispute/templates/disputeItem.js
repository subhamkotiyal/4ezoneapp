// src/components/Product.js
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  ImageBackground,
} from 'react-native';
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';

import {Mixins, Typography, Colors, AppStyles} from '_styles';
let {margin, boxShadow, scaleSize, padding, windowHeight, windowWidth} = Mixins;
import {Text, Card, SmallIcon} from '_atoms';
import {Images} from '_utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const DisputeItem = ({
  item = {},
  onPress,
  customeStyle,
  appointment = false,
  onPressSelect,
}) => (
  <Card
    cardStyle={[
      padding(0),
      margin(16, 16, 8, 16),
      boxShadow('black', {height: 1, width: 0}, 1, 0.12),
      {borderRadius: moderateScale(8)},
      customeStyle && customeStyle,
    ]}>
    {/*******************  Request Profile View  ******************/}
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={[
        AppStyles.row,
        {
          paddingVertical: verticalScale(8),
        },
      ]}>
      <View
        style={{
          flex: 0.25,
          borderRadius:8,
          marginHorizontal: 8,
          height: moderateScale(48),
          width: '100%',
        }}>
        <ImageBackground
          imageStyle={{
            borderRadius: 8,
            width: '100%',
          }}
          resizeMode="cover"
          style={{
            flex: 1,
            // alignSelf:'center',
            width: undefined,
            height: undefined,
          }}
          source={
            item &&
            item.customerId &&
            item.customerId.profileImage &&
            item.customerId.profileImage != 'none'
              ? {uri: item.customerId.profileImage}
              : Images.notfound2
          }>
          <LinearGradient
            style={{flex: 1, borderRadius:8}}
            colors={[
              'rgba(0,0,0,0.5)',
              'rgba(0,0,0,0.05)',
              'rgba(0,0,0,0.1)',
            ]}>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={[styles.leftSection]}>
        <Text
          h6
          style={[
            styles.profileText,
            {
              fontSize: Typography.normalize(16),
            },
          ]}>
          {item && item.customerId ? `${item.customerId.name}` : ''}
        </Text>
        <View style={[AppStyles.column, {paddingTop: 2}]}>
          <Text p style={[styles.profileText, {color: '#A1A1A1'}]}>
          {moment(item.createdAt).format('lll')}
          </Text>
        </View>
      </View>

      {/******* Price  **********/}
      {!appointment && (
        <View style={styles.rightStatus}>
          <Text h6 style={[styles.profileText, {
            fontSize: Typography.normalize(16),
            color: Colors.black}]}>
           $ {item && item.bookingId ? item.bookingId.totalAccount : ''}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  </Card>
);
export default DisputeItem;

const styles = StyleSheet.create({
  datetime: {color: Colors.white, alignSelf: 'center'},
  profileText: {
    color: Colors.lightblack,
    fontSize: Typography.normalize(13),
  },
  imageStyle: {height: moderateScale(12), width: moderateScale(12)},
  leftSection: {
    flex: 0.75,
    paddingHorizontal:8,
    justifyContent: 'center',
  },
  rightStatus: {
    justifyContent: 'center',
    flex: 0.18,
    paddingHorizontal: moderateScale(4),
    paddingVertical: moderateScale(4),
  },
});
