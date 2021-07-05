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
import {Mixins, Typography, Colors, AppStyles} from '_styles';
let {margin, boxShadow, scaleSize, padding, windowHeight, windowWidth} = Mixins;
import {Text, Card, SmallIcon} from '_atoms';
import {Images} from '_utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const SelectTrainerItem = ({
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
      <View style={{flex: 0.3}}>
        {item && item.profileImage && item.profileImage != 'null' ? (
          <Image
            style={{height: scale(48), width: scale(48),borderRadius:8}}
            source={{uri: item.profileImage}}
          />
        ) : (
          <SmallIcon
            source={Images.gail}
            style={{height: scale(48), width: scale(48)}}
          />
        )}
      </View>
      <View style={[styles.leftSection]}>
        <Text
          h6
          style={[
            styles.profileText,
            {
              fontSize: Typography.normalize(18),
            },
          ]}>
          {item.name ? item.name : 'test'}
        </Text>
        <View style={[AppStyles.column, {paddingTop: 2}]}>
          <Text p style={[styles.profileText, {color: '#A1A1A1'}]}>
           {item.skills && item.skills.length > 0 ? item.skills.toString():''}
          </Text>
        </View>
      </View>

      {/******* Price  **********/}
      {!appointment && (
        <View style={styles.rightStatus}>
          <Text h6 style={[styles.profileText, {color: Colors.black}]}>
            $ 150.00
          </Text>
        </View>
      )}

      {/******* Appointment check  **********/}
      {appointment && (
        <View style={styles.rightStatus}>
          <SmallIcon
            source={Images.listtick}
            style={{height: scale(16), width: scale(16)}}
          />
        </View>
      )}
    </TouchableOpacity>
  </Card>
);
export default SelectTrainerItem;

const styles = StyleSheet.create({
  datetime: {color: Colors.white, alignSelf: 'center'},
  profileText: {
    color: Colors.lightblack,
    fontSize: Typography.normalize(13),
  },
  imageStyle: {height: moderateScale(12), width: moderateScale(12)},
  leftSection: {
    flex: 0.8,
    justifyContent: 'center',
  },
  rightStatus: {
    justifyContent: 'center',
    flex: 0.25,
    paddingHorizontal: moderateScale(4),
    paddingVertical: moderateScale(4),
  },
});
