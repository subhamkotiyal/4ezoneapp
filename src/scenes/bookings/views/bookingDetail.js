import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {Text, Button, Label, SmallIcon, Header} from '_atoms';
import {Line} from '_molecules';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {MyTopTabs} from '../';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {Request} from '_services';
import Config, {SUCCESS} from '_utils/constants/apiConstant';

import {DetailItem, DetailHeader, TrainerItem} from '../../home/templates';
// Component
const BookingDetail = ({navigation, route}) => {
  const {from, itemDetail} = route.params;
  const [item, setItem] = useState(itemDetail);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    getRatingReview();
  }, []);
  console.log(item, 'ppppp');
  /****************************** Api Function *************************************/
  const getRatingReview = async () => {
    let data = {};
    data['bookingId'] = itemDetail._id;
    setLoader(true);
    try {
      let isDisputeData = await Request.post(Config.checkDispute, data);
      let isRatingData = await Request.post(Config.checkReview, data);
      if (isDisputeData.status === SUCCESS || isRatingData.status == SUCCESS) {
        let newObj = {
          ...item,
          isReview: isRatingData.data.isReview,
          isDispute: isDisputeData.data.isDispute,
        };
        setItem(newObj);
        setLoader(false);
      }
    } catch (err) {
      console.log(err.message, 'Error in ===');
    }
  };
  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1}]}>
      <ScrollView
        style={{backgroundColor: 'white'}}
        keyboardShouldPersistTaps={'never'}>
        <DetailHeader
          item={item.gymId ? {...item.gymId} : {...item.trainerId}}
        />
        <DetailItem
          item={item.gymId ? {...item.gymId} : {...item.trainerId}}
          isFromBooking
        />

        {/*******************  Trainer Alloted  ******************/}
        <View style={{height: verticalScale(16)}} />
        <Label
          title={'Trainer Alloted '}
          labeStyle={{color: Colors.black}}
          cardStyle={{paddingHorizontal: moderateScale(16)}}
        />
        <TrainerItem
          isFromBooking={from == 'Upcoming' ? true : false}
  
          item={item.trainerId ? {...item.trainerId} : {...item.gymTrainer}}
        />
        <View style={{height: verticalScale(48)}} />

        {/*******************  Trainer Upcoming Button  ******************/}
        {from == 'Upcoming' && (
          <View
            style={{
              justifyContent: 'center',
              marginVertical: moderateScale(48),
              paddingHorizontal: moderateScale(16),
              flex: 1,
            }}>
            <Button
              disabled
              onPress={() =>navigation.navigate('Chat', {
                screen: 'Chat',
                params: {itemDetail:item
                },
              })}
              title={'klj'}
            />
          </View>
        )}
        {/*******************  Trainer Pasr Button  ******************/}

        {from == 'Past' && !loader && (
          <View
            style={{
              marginVertical: moderateScale(48),
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: moderateScale(16),
              flex: 1,
            }}>
            {!item.isReview ? (
              <View style={{flex: 1}}>
                <Button
                  onPress={() =>
                    navigation.navigate('Rating', {
                      itemDetail: item,
                    })
                  }
                  title={'Rating'}
                  buttonTextStyle={{fontWight: 'bold'}}
                />
              </View>
            ) : null}
            <View style={{flex: 0.05}} />
            {!item.isDispute ? (
              <View style={{flex: 1}}>
                <Button
                  onPress={() =>
                    navigation.navigate('SendDispute', {
                      itemDetail: item,
                    })
                  }
                  buttonStyle={{
                    backgroundColor: 'transparent',
                    borderWidth: 2,
                    borderColor: Colors.primary,
                  }}
                  buttonTextStyle={{color: Colors.primary, fontWight: 'bold'}}
                  title={'Dispute'}
                />
              </View>
            ) : null}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default BookingDetail;
