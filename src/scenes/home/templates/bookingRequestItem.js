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
import moment from 'moment';

let {margin, boxShadow, scaleSize, padding, windowHeight, windowWidth} = Mixins;
import {Text, Card, SmallIcon} from '_atoms';
import {Images} from '_utils';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import AssignedDecline from './assignDeclineBtn';

const BookingRequestItem = ({
  item = {},
  onPress,
  customeStyle,
  onPressProfile,
  assignedPress,
  profileData,
  rejectRequest,
}) => (
  <Card
    cardStyle={[
      padding(0),
      margin(16, 16, 8, 16),
      boxShadow('black',{height:1,width:1},6,0.1),
      {borderRadius: 16},
    ]}>
    {/*******************  Top View  ******************/}
    <View style={styles.topView}>
      <View>
        <Text p style={styles.topTitle}>{`Appointment Request`}</Text>
      </View>
      <View style={[AppStyles.row]}>
        <View style={{flex: 0.1, 
          justifyContent:'center',
          paddingRight: scale(4)}}>
          <Image
            source={Images.clock}
            alignSelf={'center'}
            style={{height: scale(18),
              alignSelf:'center',
              width: scale(18)}}
          />
        </View>
        <Text h6 style={styles.datetime}>
          {
            item.bookingType =='instant' ? 
            `${moment(item.orderRequestTime).format('lll')}`
            :
            `${moment(item.scheduleDate).format('ll')}, ${item.scheduleTime}`

          }
        </Text>
      </View>
    </View>

    {/*******************  Request Profile View  ******************/}
    <View style={{height: scale(4)}} />
    <TouchableOpacity
      onPress={() => onPressProfile && onPressProfile()}
      style={[
        AppStyles.row,
        {
          paddingVertical: verticalScale(8),
          paddingHorizontal: moderateScale(8),
        },
      ]}>
      <View
        style={{
          flex: 0.25,
          height: scale(56),
          borderRadius: 8,
          width: scale(56),
        }}>
        <Image
          source={
            (item.customerDetails &&
              item.customerDetails.profileImage &&
              item.customerDetails.profileImage != 'null')
              ? {
                  uri: item.customerDetails.profileImage
                    ? item.customerDetails.profileImage
                    : item.customerDetails.profileImage,
                }
              : Images.notfound2
          }
          style={{height: '100%', borderRadius: 8, width: '100%'}}
        />
      </View>
      <View
        style={[
          AppStyles.column,
          {
            paddingHorizontal: moderateScale(12),
            flex: 1,
            justifyContent: 'center',
          },
        ]}>
        <Text h6 style={[styles.profileText,{

        }]}>
          {item.customerName}
        </Text>
        <Text
          p
          style={[
            styles.profileText,
            {
              fontSize: Typography.normalize(13),
            },
          ]}>
          {'Gydocaristst'}
        </Text>
      </View>
    </TouchableOpacity>
    {/*******************  Accept/Decline  View  ******************/}
    <AssignedDecline
      rejectRequest={() => rejectRequest && rejectRequest()}
      assignedPress={assignedPress}
      profileData={profileData}
    />
    <View style={{height: scale(4)}} />
  </Card>
);
export default BookingRequestItem;

const styles = StyleSheet.create({
  topView: {
    backgroundColor: '#459DDC',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'column',
  },
  datetime: {color: Colors.white,
  fontSize:Typography.normalize(16)
  },
  profileText: {color: Colors.black},

  topTitle: {color: Colors.white, fontSize: Typography.normalize(13)},
});
