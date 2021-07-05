import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  ImageBackground,
  Keyboard,
} from 'react-native';
import moment from 'moment';
import {Text, Button, Label, SmallIcon, Header} from '_atoms';
import {Line} from '_molecules';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {CommonActions} from '@react-navigation/native';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {ProfileView} from '../../profile/templates';
import {Detail} from '../../appointments/templates';
import {AssignedDecline, RequestDetailItem} from '../templates';
import {addAcceptRejectgRequest} from '../../../store/modules/requests/actions';
import Config from '_utils/constants/apiConstant';
import AcceptRequest from '../templates/acceptRequest';
// Component
const RequestDetail = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {profileData = {}} = useSelector(state => ({
    profileData: state.getProfileReducer.profileData,
  }));
  const [isAcceptModal, setIsAccepModal] = useState(false);
  const [item, setItem] = useState({...route.params.itemDetail});
  useEffect(() => {
  }, []);
  /****************************** Api Function  *************************************/
  const handleCallback = data => {
    debugger
    setIsAccepModal(true);
    // setTimeout(() => {
    //   setIsAccepModal(true);
    // }, 800);
  };
  //Press Accept /assign Button
  const pressButton = () => {
    assignRequest();
  };
  //Accept Trainer Request
  const rejectRequest = () => {
    let data = {};
    let getRequests = `${Config.doctorCurrentOrders}`;
    let apiName = Config.customerRejectorder;
    data['orderId'] = item._id;
    dispatch(addAcceptRejectgRequest(apiName, data, navigation, getRequests));
  };

  //Accept Trainer Request
  const assignRequest = () => {
    let data = {};
    let apiName = Config.customerAcceptorder;
    let getRequests = `${Config.doctorCurrentOrders}`;
    data['orderId'] = item._id;
    dispatch(addAcceptRejectgRequest(apiName, data, navigation, getRequests,handleCallback));
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
  const deletRequest = () => {
    Alert.alert(
      'Alert!',
      'Are you sure you want to reject this request?',
      [
        {text: 'Ok', onPress: () => rejectRequest()},
        {text: 'Cancel', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };
  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1}]}>
      <ScrollView
        style={{backgroundColor: 'white'}}
        keyboardShouldPersistTaps={'never'}>
        {/*************** Backgroud Header *******************/}
        <ImageBackground
          source={Images.cover}
          resizeMode={'stretch'}
          style={{width: undefined, height: windowHeight / 4}}>
          <Header
            leftText
            image={Images.backwhite}
            onPressLeft={() => navigation.goBack()}
            rightStyle={{flexDirection: 'row'}}
            style={[
              boxShadow('trasparent', {}, 0),
              {backgroundColor: 'transparent', paddingHorizontal: 0},
            ]}
            textStyle={{textAlign: 'center'}}
          />

          {/*************** Profile View ****************/}
          <ProfileView
            mainStyle={{
              left: moderateScale(24),
              position: 'absolute',
              bottom: -windowHeight / 11,
            }}
            user={item.customerDetails}
            nameStyle={{fontSize: Typography.normalize(`20`)}}
          />
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              left: moderateScale(24),
              position: 'absolute',
              left: '48%',
              bottom: -windowHeight / 40,
            }}>
            <Image
              source={Images.videocall2}
              style={{height: moderateScale(65), width: moderateScale(65)}}
            />
          </View>
        </ImageBackground>
        <View
          style={[
            padding(24, 32, 8, 32),
            {
              flex: 1,
              marginTop: moderateScale(24),
            },
          ]}>
          <RequestDetailItem item={item}/>

          {/*********************Answer Questio  ******************/}
        </View>
        <View style={{height: verticalScale(24)}} />
        <AssignedDecline
          rejectRequest={() => deletRequest()}
          assignedPress={() => pressButton()}
          profileData={profileData}
        />
      </ScrollView>
     {/****************** Accept Modal  **************/}
     {isAcceptModal && <AcceptRequest  
     navigateToScreen={navigateToScreen}
     />}

      {/****************** Accept Modal  **************/}
      {/****************** Accept Modal  **************/}
    </View>
  );
};

export default RequestDetail;
