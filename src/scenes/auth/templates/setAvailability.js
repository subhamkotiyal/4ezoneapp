import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Keyboard,
  FlatList,
} from 'react-native';
import {Text, Button, TextInput, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import PhoneInput from 'react-native-phone-input';
import {ListModal} from '_molecules';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageChooser from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {Validation, Methods} from '_utils';
import CountryPicker, {Flag} from 'react-native-country-picker-modal';

import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, windowWidth} = Mixins;

const SetAvailability = ({
  isDateTimePickerVisible,
  availability,
  showDateTimePicker,
  handleDatePicked,
  onSubmitAvailablity,
  opneDateTimePicker,
}) => {
  return (
    <View style={AppStyles.listborder}>
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#4a4a4a',
          opacity: 0.6,
          position: 'absolute',
          left: 0,
          top: 0,
        }}
      />
      <View
        style={{
          width: '85%',
          height: '70%',
          borderRadius: 8,

          backgroundColor: '#ffffff',
        }}>
        <View
          style={{
            flex: 0.2,
            //  width: '100%',
            justifyContent: 'center',
            //borderBottomWidth: 1.0,
            borderColor: 'gray',
            height: wp('10.66%'),
            alignItems: 'center',
            marginTop: moderateScale(16),
          }}>
          <Text
            h5
            style={{
              //fontSize: wp('5.53%'),
              marginLeft: wp('3.2%'),
              fontFamily: 'CharlieDisplay-Regular',
              color: 'black',
              marginTop: wp('2.66%'),
            }}>
            Set availability
          </Text>
          <Text
            p
            style={{
              fontSize: wp('3.53%'),
              marginLeft: wp('3.2%'),
              fontFamily: 'CharlieDisplay-Regular',
              color: Colors.textColor,
              textAlign: 'center',
            }}>
            The day which does not have Opens & Close time consider to be off
            day
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderBottomEndRadius: 8,
            borderBottomStartRadius: 8,
            marginTop: moderateScale(16),
            backgroundColor: 'white',
          }}>
          {renderSetavailability(availability, opneDateTimePicker)}
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => onSubmitAvailablity()}
              style={{
                width: '80%',
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 16,
                marginTop: 16,
                borderRadius: 10,
                backgroundColor: Colors.primary,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: wp('5%'),
                  fontFamily: 'CharlieDisplay-semibold',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {isDateTimePickerVisible && (
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={() => showDateTimePicker(false)}
          mode="time"
          headerTextIOS={'Pick a time'}
        />
      )}
    </View>
  );
};

const renderSetavailability = (availability, opneDateTimePicker) => {
  return (
    <FlatList
      data={availability}
      renderItem={({item}) => (
        <View
          style={{
            flexDirection: 'row',
            marginTop: 15,
            alignItems: 'center',
            paddingHorizontal: moderateScale(16),
            flex: 1,
            justifyContent: 'center',
          }}>
          <View style={{flex: 0.4}}>
            <Text h6 style={{color: Colors.Black, fontSize: wp('4.53%')}}>
              {item.day}
            </Text>
          </View>
          <View style={{flex: 0.7, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => opneDateTimePicker(true, item, 'open')}
              style={{
                flex: 0.5,
                borderBottomWidth: 1,
                borderBottomColor: Colors.borderColor,
              }}>
              <Text>{item.openTime ? item.openTime : `Open Time`}</Text>
            </TouchableOpacity>
            <View style={{flex: 0.1}} />
            <TouchableOpacity
              onPress={() => opneDateTimePicker(true, item, 'close')}
              style={{
                flex: 0.5,
                borderBottomWidth: 1,
                borderBottomColor: Colors.borderColor,
              }}>
              <Text>{item.closeTime ? item.closeTime : `Close Time`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}></FlatList>
  );
};
export default SetAvailability;
