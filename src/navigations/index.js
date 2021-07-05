import React, {useEffect, useState} from 'react';
import {Platform, Alert,View} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import messaging from '@react-native-firebase/messaging';
import NotificationSetting from 'react-native-open-notification';
import notifee from '@notifee/react-native';
import {RtcEngine, AgoraView} from 'react-native-agora';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Request} from '_services';

import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import KeyboardManager from 'react-native-keyboard-manager';
import FlashMessage from 'react-native-flash-message';
import {Indicator} from '_atoms';
import SplashScreen from 'react-native-splash-screen';
import {saveFcmTokenRequest} from '../store/modules/login/actions';
import useNotificationInitializer from '../hooks/useNotificationInitializer';
import SocketIOClient from 'socket.io-client';
import config from '../config';
//Stack Compoennt
import AuthNavigator from './auth-navigator';
import AppNavigator from './app-navigator';
import {Configuration} from '_utils';
const Stack = createStackNavigator();
import AgoraVideo from '../scenes/agoraVideo/index';

//Main App Render
const App = () => {
  /********************** Hooks Function **********************/
  const dispatch = useDispatch();
  const [isVideo, setIsVideo] = useState(false);
  let WSService;

  const {user = {}, fcmToken = null} = useSelector(state => ({
    user: state.getProfileReducer.profileData,
    fcmToken: state.loginReducer.fcmToken,
  }));
  const [connectedSc, setConnected] = useState(false);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      KeyboardManager.setToolbarPreviousNextButtonEnable(true);
    }
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);
  /********************** Notification Receiving Handler function **********************/
  const loading = useNotificationInitializer();
  /********************** Socket Function **********************/
  useEffect(() => {
    if (user && user._id) {
      let data = {};
      data['doctorId'] = user._id;
      data['firebase_token'] = fcmToken;
      WSService = SocketIOClient(config.BASE_URL, {
        transports: ['polling'],
      });
      WSService.on('connect', () => {
        console.log('Connect socket 1');
        WSService.emit(`doctorsocket`, data, data => {
          console.log('Connect doctorsocket 1');
        });
      });
      Configuration.setConfiguration('Socket', WSService);
      setConnected(true);
    } else {
      setConnected(true);
    }
  }, []);
  /********************** Socket Function **********************/

  // useEffect(() => {
  //   if (user && user._id) {
  //     let data = {
  //       doctorId: user._id,
  //       type: 'doctor',
  //       // firebase_token: 'none',
  //     };
  //     WSService.initializeSocket(data, 'doctorsocket');
  //   }
  // }, []);

  useEffect(() => {
    if (user && user._id && WSService) {
      videoRequestFromCustomer();
      return () => {
        WSService.removeListener('doctor_video_socket');
      };
    }
  }, []);
  useEffect(() => {
    if (user && user._id && WSService) {
      videoEndRequestFromCustomer();
      return () => {
        WSService.removeListener('doctor_end_video_socket');
      };
    }
  }, []);
  const videoRequestFromCustomer = () => {
    WSService.on('doctor_video_socket', data => {
      if (data && data.orderId) {
        VideoCallModal(data);
      }
    });
  };
  const videoEndRequestFromCustomer = () => {
    WSService.on('doctor_end_video_socket', data => {
      endCall();
    });
  };
  /********************** Connect Video Function **********************/
  const joinVideoCal = data => {
    if (data && data.orderId) {
      let uid = Math.floor(Math.random() * 100);
      RtcEngine.joinChannel(data.orderId, uid);
      RtcEngine.enableAudio(); //Join Channel
      setIsVideo(true);
    }
  };
  const VideoCallModal = data => {
    if (data) {
      Alert.alert(
        'Video Call!',
        'Do you want accept this video call ?',
        [
          {text: 'Yes', onPress: () => joinVideoCal(data)},
          {text: 'No', onPress: () => endLiveFeedAction(data)},
        ],
        {cancelable: false},
      );
    }
  };
  const endCall = data => {
    //RtcEngine.destroy();
    RtcEngine.leaveChannel();
    setIsVideo(false);

    // Actions.home();
  };
  const endLiveFeedAction = async data => {
    if (data && data.orderId) {
      let {orderId, doctorId} = data;
      if (orderId) {
        try {
          let data = {};
          data['doctorId'] = doctorId;
          data['orderId'] = orderId;
          let videoData = await Request.post(`${Config.endVideocalling}`, data);
          if (videoData.status === SUCCESS) {
            let uid = Math.floor(Math.random() * 100);
            endCall();
            setIsVideo(false);
          }
        } catch (err) {
          alert(JSON.stringify(err));

          console.log(err.message, 'Error in fav');
        }
      }
    }
  };
  /************************  Render Main App   ****************************/
  if (loading && connectedSc) {
    return (
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          {user && user.token ? (
            <>
              <Stack.Screen name="App" component={AppNavigator} />
            </>
          ) : (
            <>
              <Stack.Screen name="Auth" component={AuthNavigator} />
            </>
          )}
        </Stack.Navigator>
        <FlashMessage position="top" animated={true} />
        <Indicator />
        <AgoraVideo isVideo={isVideo} endCall={endCall} />
      </NavigationContainer>
    );
  } else {
    return <View />;
  }
};

export default App;
