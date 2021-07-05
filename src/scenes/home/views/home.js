import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Text, Button, Header} from '_atoms';
import {ListEmptyComponent, CenterModal} from '_molecules';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import {Configuration} from '_utils';
import {Request} from '_services';
import Config, {SUCCESS} from '_utils/constants/apiConstant';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {BookingRequestItem} from '../templates';
import AcceptRequest from '../templates/acceptRequest';

let {boxShadow, padding} = Mixins;
import {changeOnlineOfflineRequest} from '../../../store/modules/getProfile/actions';
import {
  getCurrentRequestsBooking,
  addAcceptRejectgRequest,
} from '../../../store/modules/requests/actions';


//Component
const Home = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    getCurrentBookingRequest();
  }, []);
  const {
    profileData = {},
    pastBooking = [],
    currentRequests = [],
  } = useSelector(state => ({
    profileData: state.getProfileReducer.profileData,
    currentRequests: state.requestsReducer.currentRequests,
  }));
  let WSService = Configuration.getConfiguration('Socket');

  const [orderRequests, setCurrentRequests] = useState(currentRequests);
  useEffect(() => {
    setCurrentRequests(currentRequests)
  }, [currentRequests]);
  const [isAcceptModal, setIsAccepModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if(WSService){
      orderReceiveFromCustomer();
      return () => {
        WSService.removeListener('order_doctor_socket');
      };
    }
   
  }, []);

  /****************************** Api Function  *************************************/
   // Message recive from server
   const orderReceiveFromCustomer = () => {
    WSService.on('order_doctor_socket', data => {
      if(data && data.orderId){
        getOrderById(data.orderId)
      }
    });
  };

  const handleCallback = data => {
    setIsAccepModal(true);

    // setTimeout(() => {
    //   setIsAccepModal(true);
    // }, 500);
  };
  const navigateToScreen = () => {
    setIsAccepModal(false);
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {name: 'Home'},
          {
            name: 'Appointments',
          },
        ],
      }),
    );
  };
  const onRefreshList = () => {
    getCurrentBookingRequest();
  };
  //Change Active status
  const changeOnlineOffline = () => {

    if (profileData) {
      let {role} = profileData;
      let apiName;
      let data = {};

      apiName = Config.onlineOfflineDoctor;
      data['doctorStatus'] = getActiveStaus() ? 'Offline' : 'Online';
      dispatch(changeOnlineOfflineRequest(apiName, data, navigation));
    }
  };

  //Get Current Booking Request
  const getCurrentBookingRequest = () => {
    let data = {};
    let apiName = `${Config.doctorCurrentOrders}`;
    dispatch(getCurrentRequestsBooking(apiName, data, navigation));
  };
  const getOrderById =async (orderId) => {
    try {
      let orderDetail = await Request.get(`${Config.orderdetail}${orderId}`);
      debugger
      if (orderDetail.status === SUCCESS) {
        setCurrentRequests([...orderRequests,orderDetail.data])
      }
    } catch (err) {
      console.log(err.message, 'Error in ===');
    }
  };
  //Reject Request
  const rejectRequest = item => {
    let data = {};
    let getRequests = `${Config.doctorCurrentOrders}`;
    let apiName = Config.customerRejectorder;
    data['orderId'] = item._id;
    dispatch(addAcceptRejectgRequest(apiName, data, navigation, getRequests));
  };
  //Press Accept /assign Button
  const pressButton = item => {
    assignRequest(item);
  };
  //Accept Trainer Request
  const assignRequest = item => {
    let data = {};
    let apiName = Config.customerAcceptorder;
    let getRequests = `${Config.doctorCurrentOrders}`;
    data['orderId'] = item._id;
    dispatch(
      addAcceptRejectgRequest(
        apiName,
        data,
        navigation,
        getRequests,
        handleCallback,
      ),
    );
  };

  /****************************** Function Main  *************************************/
  const getActiveStaus = () => {
    if (profileData) {
      let activeStatus = profileData.doctorStatus;
      return activeStatus == 'Offline' ? false : true;
    }
  };
  const deletRequest = item => {
    Alert.alert(
      'Alert!',
      'Are you sure you want to reject this request?',
      [
        {text: 'Ok', onPress: () => rejectRequest(item)},
        {text: 'Cancel', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.hamburger}
        rightText={getActiveStaus() ? 'ONLINE' : 'OFFLINE'}
        rightImage={getActiveStaus() ? Images.online : Images.offline}
        textStyle={{marginLeft: moderateScale(42), textAlign: 'center'}}
        onPressRight={() => changeOnlineOffline()}
        onPressLeft={() => navigation.openDrawer()}
        rightStyle={{flexDirection: 'row', flex: 0.3}}
        style={[
          boxShadow('trasparent', {}, 0),
          {
            paddingHorizontal: moderateScale(16),
          },
        ]}
        title={'My Request'}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingTop: scale(16),
        }}>
        <FlatList
          data={orderRequests}
          refreshing={refreshing}
          onRefresh={() => onRefreshList()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmptyComponent message={'No request found!'} />
          )}
          renderItem={({item, index}) => (
            <BookingRequestItem
              item={item}
              index={index}
              profileData={profileData}
              rejectRequest={() => deletRequest(item)}
              assignedPress={() => pressButton(item)}
              onPressProfile={() =>
                navigation.navigate('RequestDetail', {
                  itemDetail: item,
                })
              }
            />
          )}
          style={{backgroundColor: Colors.white}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => 'store' + index}
        />
      </View>
      {/****************** Accept Modal  **************/}
          {/****************** Accept Modal  **************/}
          {isAcceptModal && <AcceptRequest  
     navigateToScreen={navigateToScreen}
     />}
      {/****************** Accept Modal  **************/}
    </View>
  );
};

export default Home;
