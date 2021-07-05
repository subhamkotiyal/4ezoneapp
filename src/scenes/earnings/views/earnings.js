import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {Text, Button, TextInput, SmallIcon, Card, Header} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Line} from '_molecules';
import {Request} from '_services';
import {WebView} from 'react-native-webview';
import {MyTopTabs} from '../';

import {Images} from '_utils';
import {useDispatch, useSelector} from 'react-redux';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin, windowHeight} = Mixins;
// Component
const Earnings = ({navigation}) => {
  const [activeState, setActiveState] = useState('Day');
  const [dayEarning, setDayEarning] = useState('');
  const [weekEarning, setWeekEarning] = useState('');
  const {profileData = {}} = useSelector(state => ({
    profileData: state.getProfileReducer.profileData,
  }));
  useEffect(() => {
    getDayEarnings();
    getWeekEarnings();
  }, []);
  /****************************** API Function *************************************/
  const getDayEarnings = async () => {
    if (profileData) {
      let { _id} = profileData;
      let apiName =`${Config.getDoctorDayEarning}${_id}`
      const response = await Request.getWebView(apiName);
      debugger
      if (response) {
        setDayEarning(response.data);
      }
    }
  };
  const getWeekEarnings = async () => {
    if (profileData) {
      let { _id} = profileData;
      let apiName =`${Config.getDoctorWeekEarning}${_id}`
      const response = await Request.getWebView(apiName);
      debugger
      if (response) {
        setWeekEarning(response.data);
      }
    }
  };

  const pressButton = title => {
    setActiveState(title);
  };

  /****************************** Render Child Component  **************************/

  const RenderButton = ({title, backgroundColor, color, action}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <Button
          onPress={() => pressButton(title)}
          buttonStyle={{
            borderRadius: 0,
            height: moderateScale(42),
            backgroundColor: backgroundColor ? backgroundColor : Colors.primary,
          }}
          buttonTextStyle={[
            {fontWeight: 'normal', color: color ? color : Colors.white},
          ]}
          title={title}
        />
      </View>
    );
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.hamburger}
        onPressLeft={() => navigation.openDrawer()}
        style={[boxShadow('trasparent', {}, 0), padding(0)]}
        title={'Earning'}
        textStyle={{textAlign: 'center'}}
      />
        <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingTop: scale(16),
        }}>
        <MyTopTabs
          dayWebView={()=>dayEarning ? (
            <WebView
              originWhitelist={['*']}
              source={{html: `${dayEarning}`}}
              startInLoadingState={true}
              renderLoading={() => (
                <View style={{
                  position:'absolute',top:'25%',left:'50%'}}>

                <ActivityIndicator size={'large'} color={Colors.primary} />
                </View>
              )}
              style={{height:windowHeight/1.5,width: '100%'}}
            />
          ) : <View style={{flex:1,alignSelf:'center'}}><Text>No Earning found!</Text></View> }

          weekWebView={()=> weekEarning ? (
            <WebView
              originWhitelist={['*']}
              startInLoadingState={true}
              source={{html: `${weekEarning}`}}
              renderLoading={() => (
                <View style={{
                  position:'absolute',top:'25%',left:'50%'}}>

                <ActivityIndicator size={'large'} color={Colors.primary} />
                </View>
              )}
              style={{height:windowHeight/1.5,width: '100%'}}            />
          ):<View style={{flex:1,alignSelf:'center'}}><Text>No Earning found!</Text></View> }
        />
      </View>
     
    </View>
  );
};

export default Earnings;
