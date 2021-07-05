import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
  ImageBackground,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import {Text, Button, Label, SmallIcon, Header} from '_atoms';
import {Line} from '_molecules';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {Detail} from '../../appointments/templates';
// Component
const BookingRequestItem = ({
  item = {},
}) => (
   <View style={{marginTop:16}}>
      {/*********************Docyor detail  ******************/}
     
          <View style={{height: verticalScale(32)}} />
          <Line />
          <View style={{height: verticalScale(2)}} />

          {/*********************Appointment detail  ******************/}

          <Detail leftTitle={`Appointment request`} />
          <View style={{height: verticalScale(1)}} />
          <Label
            labelStyle={{fontSize: Typography.normalize(13)}}
            title={
              item.bookingType =='instant' ? 
            `${moment(item.orderRequestTime).format('lll')}`
            :
            `${moment(item.scheduleDate).format('ll')}, ${item.scheduleTime}`
            }

          />
          <View style={{height: verticalScale(4)}} />

          <View style={{height: verticalScale(2)}} />
          <Line />
          <Detail leftTitle={`Amount`} />
          <View style={{height: verticalScale(1)}} />
          <Label
            title={`$ ${item.orderTotal}`}
            labelStyle={{fontSize: Typography.normalize(13)}}
          />
          <View style={{height: verticalScale(4)}} />

          <Line />
          {/*********************Doctor answer  ******************/}

          <View style={{height: verticalScale(16)}} />
          <Label
            title={`Answer by ${item.customerName}`}
            labelStyle={{color: '#65AAD0', fontSize: Typography.normalize(16)}}
          />
          {/*********************Answer Question ******************/}
          <View style={{height: verticalScale(8)}} />
          {
            item.questionaire && item.questionaire.length > 0 ?
            item.questionaire.map((question,i) => {
              return  <View key={'index'+i} style={{marginTop:i > 0 ? moderateScale(8) :0}}>
              <Text
                p
                style={[
                  {
                    fontSize: Typography.normalize(12),
                  },
                ]}>
               {question.question}
              </Text>
              <View style={{height: verticalScale(2)}} />
  
              <Text
                p
                style={[
                  AppStyles.bold,
                  {
                    fontSize: Typography.normalize(14),
                    color: Colors.black,
                  },
                ]}>
               {question.answer}
              </Text>
            </View>
            }):null
          }
         
  </View>
);
export default BookingRequestItem;

const styles = StyleSheet.create({
  
});
