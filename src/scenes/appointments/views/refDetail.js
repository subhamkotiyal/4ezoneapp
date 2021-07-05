import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';
import {Text, Button, Label, SmallIcon, Header} from '_atoms';
import {Line} from '_molecules';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images, Methods} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {MyTopTabs} from '../';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {useDispatch, useSelector} from 'react-redux';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Request} from '_services';
import {AdditinalInfo, TopHeader, DetailHeader} from '../templates';
import {
  getBookingRequest,
  assignBookingRequest,
} from '../../../store/modules/booking/actions';

// Component
const RefDetail = ({navigation, route}) => {
  const {orderId, itemDetail, title} = route.params;
  const dispatch = useDispatch();
  const [item, setItem] = useState(itemDetail);

  useEffect(() => {
    getRefDetail();
  }, []);

  /****************************** Api Function *************************************/
  const getRefDetail = async () => {
    if (item) {
      try {
        let {getDetail} = checkRefFrom();
        let docData = await Request.get(`${getDetail}${item._id}`);
        if (docData.status === SUCCESS) {
          if (docData.data.length > 0) {
            setItem(docData.data[0]);
          }
        }
      } catch (err) {
        console.log(err.message, 'Error in fav');
      }
    }
  };

  //Assign Booking
  const assignBooking = () => {
    let {apiName, body} = checkRefFrom();
    dispatch(assignBookingRequest(apiName, body, navigation, responseAssign));
  };

  //Callback function
  const responseAssign = data => {
      let apiPastBooking;
      let apiUpcomimgBooking;
      apiPastBooking = `${Config.doctorpastBooking}`;
      apiUpcomimgBooking = `${Config.doctorupcomingBooking}`;
      dispatch(getBookingRequest(apiPastBooking, apiUpcomimgBooking));
      navigation.popToTop();
    
  };

  // Check ref from user
  const checkRefFrom = () => {
    let apiName;
    let getDetail;
    let body = {};
  alert(title)
    switch (title) {
      case 'Pharmacy':
        apiName = Config.assignOrdertoChemist;
        getDetail = Config.getChemistById;
        body = {
          orderId: orderId,
          chemistId: item._id,
        };
        break;
      case 'Lab':
        apiName = Config.assignOrdertoLab;
        getDetail = Config.getLabById;
        body = {
          orderId: orderId,
          labassistantId: item._id,
        };
        break;
      case 'Hospital':
        apiName = Config.assignOrdertoHospital;
        getDetail = Config.getHospitalById;
        body = {
          orderId: orderId,
          hospitalId: item._id,
        };
        break;
      case 'Doctors':
        apiName = Config.assignOrdertoDoctor;
        getDetail = Config.getDoctorById;
        body = {
          orderId: orderId,
          referaldoctorId: item._id,
        };
        break;
      default:
    }
    return {apiName, getDetail,body};
  };
  /****************************** Render Main  *************************************/

  return (
    <View style={[{flex: 1, backgroundColor: 'white'}]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'never'}>
        <DetailHeader item={item} />
        {/******************* Detail User  ***************/}
        <TopHeader item={item} />
        <Line />
        {/*************************** Address  ***************/}
        <View style={AppStyles.detailContainer}>
          {/******************* Doctor Item  ***************/}
          <View style={{height: 16}} />
          <Label
            title={'Address'}
            labeStyle={{color: Colors.black}}
            cardStyle={{paddingHorizontal: moderateScale(24)}}
          />
          <View style={{height: 2}} />
          <AdditinalInfo
            leftImage={Images.formaladdress}
            leftTitle={item.address}
          />
        </View>
      </ScrollView>
      <Button
        buttonStyle={{borderRadius: 0, marginHorizontal: 16}}
        onPress={() => assignBooking()}
        title={'Done'}
      />
    </View>
  );
};

export default RefDetail;
