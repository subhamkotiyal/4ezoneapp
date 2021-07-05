import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, ScrollView, ImageBackground, Keyboard } from 'react-native';
import { Text, Button, Label, SmallIcon, Header } from '_atoms'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { useDispatch, useSelector } from "react-redux";

import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { ListEmptyComponent} from '_molecules'
import {
    getBookingRequest
  } from '../../../store/modules/booking/actions'
import {MyTopTabs} from '../'
let { boxShadow, padding, windowWidth, windowHeight } = Mixins

// Component 
const MyBooking = ({ navigation }) => {
    const dispatch = useDispatch()
    const { pastBooking=[], upcomingBooking=[]} = useSelector(state => ({
        pastBooking: state.bookingReducer.pastBooking,
        upcomingBooking: state.bookingReducer.upcomingBooking,
    }));
    useEffect(() => {
        getBookings()
    }, [])
    /****************************** Api Function *************************************/
    const getBookings = () => {
          dispatch(getBookingRequest())
    }
    /****************************** Render Main  *************************************/
    return <View style={[{ flex: 1 }]}>
            <Header
            style={[boxShadow('trasparent', {}, 0), padding(0)]}
            title={'My Bookings'}
            textColor={Colors.black}
            textStyle={{ textAlign: 'center' }}
        />
        <MyTopTabs 
        pastBooking={pastBooking}
        upcomingBooking={upcomingBooking}
        />
         
    </View>
}

export default MyBooking;