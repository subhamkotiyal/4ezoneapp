import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Keyboard,
  Image,
} from 'react-native';
import moment from 'moment';
import {Text, Button, Label, SmallIcon, Header} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {RtcEngine, AgoraView} from 'react-native-agora';

let {boxShadow, padding, windowWidth, margin, windowHeight} = Mixins;
import {ProfileView} from '../../profile/templates';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {RequestDetailItem} from '../../home/templates';
import AgoraVideo from '../../agoraVideo/index';
import {
  getBookingRequest,
  assignBookingRequest,
} from '../../../store/modules/booking/actions';

import {WSService} from '_utils';
import {Request} from '_services';
// Component
const AppointMentDetail = ({navigation, route}) => {
  const {itemDetail, from} = route.params;
  const [isVideo, setIsVideo] = useState(false);
  const dispatch = useDispatch();

  const {profileData = {}} = useSelector(state => ({
    profileData: state.getProfileReducer.profileData,
  }));
  const [item, setItem] = useState({...route.params.itemDetail});
  useEffect(() => {
    console.log(item, 'setintem');
    //getBookingDetail();
  }, []);
  /****************************** Api function *************************************/
  const getBookingDetail = async () => {
    try {
      // const bookingData = await Request.get(
      //   `${Config.getBookingDetailById}${itemDetail._id}`,
      // );
      // debugger;
      // if (bookingData.status === SUCCESS) {
      //   if (
      //     bookingData.data &&
      //     bookingData.data &&
      //     bookingData.data.data.length > 0
      //   ) {
      //     let {additionalInfo} = bookingData.data.data[0];
      //     let infoArray = additionalInfo.split(',');
      //     console.log(infoArray,"infoArray")
      //     setItem({
      //       ...item,
      //       ...bookingData.data.data[0],
      //       name: infoArray[0],
      //       mobileNumber: infoArray[1],
      //       address: infoArray[2],
      //       landmark:infoArray.length >4 ?
      //       infoArray[infoArray.length-2]
      //        :'',
      //       special:infoArray.length >4 ?
      //       infoArray[infoArray.length-1]
      //        :''
      //     });
      //   }
      // }
    } catch (error) {
      console.log(error, 'errroorororooror');
    }
  };

  const complteBooking = () => {
    let data = {
      orderId: item._id,
    };
    let apiName = Config.completeBooking;
    dispatch(assignBookingRequest(apiName, data, navigation, responseAssign));
  };
  const responseAssign = data => {
    debugger;
    if (data) {
      let apiPastBooking;
      let apiUpcomimgBooking;
      let data = {};
      apiPastBooking = `${Config.doctorpastBooking}`;
      apiUpcomimgBooking = `${Config.doctorupcomingBooking}`;
      dispatch(getBookingRequest(apiPastBooking, apiUpcomimgBooking));
      navigation.popToTop();
    }
  };
  const liveFeedAction = async () => {
    let {_id, customerId} = item;
    if (_id) {
      try {
        let data = {};
        data['customerId'] = customerId;
        data['orderId'] = _id;
        let videoData = await Request.post(`${Config.startVideocalling}`, data);
        if (videoData.status === SUCCESS) {
          let uid = Math.floor(Math.random() * 100);
          RtcEngine.joinChannel(_id, uid);
          RtcEngine.enableAudio(); //Join Channel
          setIsVideo(true);
        }
      } catch (err) {
        console.log(err.message, 'Error in fav');
      }
    }
  };
  /****************************** Function Main  *************************************/
  const pressButton = title => {
    if (from == 'Past') {
      navigation.navigate('Rating', {
        itemDetail: item,
        getAppointments:()=> route.params.getAppointments()
      });
    } else if (title == 'Ref. to Chemist') {
      navigation.navigate('ChemistList', {
        itemDetail: item,
        title:'Pharmacy'
      });
    }else if (title == 'Ref. to Doctor') {
      navigation.navigate('ChemistList', {
        itemDetail: item,
        title:'Doctors'
      });
    }else if (title == 'Ref. to Lab') {
      navigation.navigate('ChemistList', {
        itemDetail: item,
        title:'Lab'

      });
    }else if (title == 'Ref. to Hospital') {
      navigation.navigate('ChemistList', {
        itemDetail: item,
        title:'Hospital'
      });
    } else if (title == 'Completed') {
      complteBooking();
    }
  };
  const endCall = ()=> {
    //RtcEngine.destroy();
    RtcEngine.leaveChannel();
    setIsVideo(false);

    // Actions.home();
  }
  /****************************** Render Child  *************************************/
  const Line = () => {
    return (
      <View
        style={{
          height: moderateScale(1),
          backgroundColor: Colors.borderColor,
          marginTop: moderateScale(2),
        }}
      />
    );
  };

  const RenderButton = ({title, transparent}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 0.5,
        }}>
        <Button
          onPress={() => pressButton(title)}
          buttonTextStyle={{
            paddingTop: 0,
            fontSize: Typography.normalize(14),
          }}
          title={title}
        />
      </View>
    );
  };
  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1}]}>
      <ScrollView
        style={{backgroundColor: 'white', flex: 1}}
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
              left: from !== 'Past' ? moderateScale(24) : moderateScale(32),
              position: 'absolute',
              bottom: -windowHeight / 11,
            }}
            user={item.customerDetails}
            nameStyle={{
              fontSize: Typography.normalize(`20`),
              textTransform: 'capitalize',
            }}
          />
          {from !== 'Past' ? (
            <TouchableOpacity
              onPress={() => liveFeedAction()}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                left: moderateScale(24),
                position: 'absolute',
                left: '52%',
                bottom: -windowHeight / 40,
              }}>
              <Image
                source={Images.videocall2}
                style={{height: moderateScale(65), width: moderateScale(65)}}
              />
            </TouchableOpacity>
          ) : null}
        </ImageBackground>
        <View
          style={[
            padding(24, 32, 8, 32),
            {
              flex: 1,
              marginTop: moderateScale(24),
            },
          ]}>
          <RequestDetailItem item={item} />
          <View style={{height: verticalScale(32)}} />
          {/*********************Answer Questio  ******************/}
          {from == 'Past' ? (
            !item.review.DSubAt ? (
              <RenderButton title={`Rating`} />
            ) : (
              <View />
            )
          ) : (
            <View>
              <View style={{flexDirection: 'row'}}>
                <RenderButton title={`Ref. to Chemist`} />
                <View style={{flex: 0.05}} />
                <RenderButton title={`Ref. to Lab`} />
              </View>
              <View style={{marginTop: moderateScale(16)}} />
              <View style={{flexDirection: 'row'}}>
                <RenderButton title={`Ref. to Hospital`} />
                <View style={{flex: 0.05}} />
                <RenderButton title={`Completed`} />
              </View>
              <View style={{marginTop: moderateScale(16)}} />
              <View style={{flexDirection: 'row'}}>
                <RenderButton title={`Ref. to Doctor`} />
                <View style={{flex: 0.5}} />
              </View>
              <View style={{marginTop: moderateScale(16)}} />
            </View>
          )}
        </View>
      </ScrollView>
      <AgoraVideo isVideo={isVideo} 
      endCall={endCall}
      />
    </View>
  );
};

export default AppointMentDetail;
