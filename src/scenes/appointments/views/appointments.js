import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Text, Header} from '_atoms';
import {useDispatch, useSelector} from 'react-redux';

import {getBookingRequest} from '../../../store/modules/booking/actions';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {MyTopTabs} from '../';
import Config from '_utils/constants/apiConstant';

let {boxShadow, padding} = Mixins;

// Component
const Appointments = ({navigation}) => {
  /****************************** Hooks and store function *************************************/
  const dispatch = useDispatch();
  const {pastBooking = [], upcomingBooking = [],profileData={}} = useSelector(state => ({
    pastBooking: state.bookingReducer.pastBooking,
    profileData: state.getProfileReducer.profileData,
    upcomingBooking: state.bookingReducer.upcomingBooking,
  }));
 
useEffect(() => {
    getAppointments();
  }, []);

  /****************************** Api Function *************************************/
  const getAppointments = () =>{
    let apiPastBooking
    let apiUpcomimgBooking
    let data ={}
    apiPastBooking = `${Config.doctorpastBooking}`
    apiUpcomimgBooking = `${Config.doctorupcomingBooking}`
    dispatch(getBookingRequest(apiPastBooking,apiUpcomimgBooking))
  }
  /****************************** Render Main  *************************************/
 
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.hamburger}
        onPressLeft={() => navigation.openDrawer()}
        style={[boxShadow('trasparent', {}, 0)]}
        title={'My Appointments'}
        textStyle={{textAlign: 'center'}}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingTop: scale(16),
        }}>
        <MyTopTabs
          pastBooking={pastBooking}
          getAppointments={getAppointments}
          upcomingBooking={upcomingBooking}
        />
      </View>
      
    </View>
  );
};

export default Appointments;
