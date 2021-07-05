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
import moment from 'moment';
import {Images, Methods} from '_utils';
const {capitalize} = Methods;
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

const RefListItem = ({
  item = {},
  onPress,
  customeStyle,
  isCart,
  onPressSelect,
}) => {
  let address;
  if (item.additionalInfo) {
    let infoAddress = item.additionalInfo.split(',');
    address = infoAddress.length > 1 ? infoAddress[2] : '';
  }
  return (
    <Card
      cardStyle={[
        padding(0),
        margin(16, 16, 8, 16),
        boxShadow('black',{height:1,width:1},6,0.1),
        {borderRadius: 8},
      ]}>
      {/*******************  Request Profile View  ******************/}
      <TouchableOpacity
        onPress={() => onPress && onPress()}
        style={[
          AppStyles.row,
          {
            paddingHorizontal: moderateScale(8),
            paddingVertical: moderateScale(8),
            paddingBottom: 8,
          },
        ]}>
        <View
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              width: scale(65),
            },
          ]}>
          <Image source={item.profileImage  && item.profileImage != 'null' ? {uri:item.profileImage} : Images.notfound2} style={styles.profileStyle} />
        </View>
        <View style={[styles.leftSection]}>
          <Text
            h6
            style={[
              styles.profileText,
              {
                fontSize: Typography.normalize(20),
                textTransform: 'capitalize',
              },
            ]}>
            {item.name}
          </Text>
            <Text p style={[styles.profileText,{
                 color:'rgba(0,0,0,0.4)'
            }]}>{item.address}
            </Text>
        </View>
        <View
          style={[
            {
              justifyContent: 'center',
              height: scale(18),
              alignSelf:'center',
              alignItems: 'center',
              paddingHorizontal:16,
              width: scale(18),
            },
          ]}>
          <Image source={Images.arrowright}
          style={styles.forwardprofileStyle} />
        </View>
      </TouchableOpacity>
    </Card>
  );
};
export default RefListItem;

const styles = StyleSheet.create({
  datetime: {color: Colors.white, alignSelf: 'center'},
  profileText: {
    color: Colors.black,
    fontSize: Typography.normalize(13),

  },
  profileStyle: {height: scale(65), width: scale(65), borderRadius: 8},
  forwardprofileStyle:{
    height: scale(18), width: scale(18),
    alignSelf:'center'
  },
  imageStyle: {height: moderateScale(12), width: moderateScale(12)},
  leftSection: {
    flex: 1,
    paddingHorizontal: moderateScale(12),
    justifyContent: 'flex-start',
  },
  rightStatus: {
    height: moderateScale(24),
    backgroundColor: Colors.primary2,
    borderTopEndRadius: 8,
    borderBottomLeftRadius: 8,
    paddingTop: moderateScale(2),
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
});
