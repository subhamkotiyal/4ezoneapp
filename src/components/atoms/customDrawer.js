import React, {useEffect} from 'react';
import {View, StyleSheet, Alert,ImageBackground} from 'react-native';
import {Mixins, Typography, Colors, AppStyles} from '_styles';
let {margin, boxShadow, scaleSize, padding} = Mixins;
import {Text, Card, SmallIcon} from '_atoms';
import {Images} from '_utils';
import LinearGradient from 'react-native-linear-gradient';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';

const menuArray = [
  {name: 'Home', icon: Images.homeprofile, routeName: 'Home'},
  {
    name: 'My Appointments',
    icon: Images.myappointments,
    routeName: 'Appointments',
  },
  {name: 'Payment Details', icon: Images.wallet, routeName: 'Payments'},
  {name: 'My Profile', icon: Images.nameIcon, routeName: 'Profile'},
  {name: 'Earning', icon: Images.earning, routeName: 'Earnings'},
  {name: 'Help & Support', icon: Images.support, routeName: 'Support'},
  {name: 'Logout', icon: Images.support, routeName: 'Logout'},
];
import {logoutRequest} from '../../store/modules/login/actions';

const CustomDrawer = ({navigation}) => {
  const dispatch = useDispatch();

  const {user} = useSelector(state => ({
    user: state.getProfileReducer.profileData,
  }));
  useEffect(() => {
    if (user && user.role == 'trainer') {
      menuArray.splice(3, 1);
    }
  }, []);
  console.log(user, 'user');
  const LogoutAction = () => {
    Alert.alert(
      'Alert!',
      'Are you sure you want to logout?',
      [
        {text: 'Ok', onPress: () => logoutAgain()},
        {text: 'Cancel', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };
    /****************************** API Function *************************************/
    const logoutAgain = () => {
      dispatch(logoutRequest(navigation));
    };
   const onMenuPress = (menu) =>{
     if(menu.routeName == 'Logout'){
      LogoutAction()
     }else if(menu.routeName){
      navigation.navigate(menu.routeName)
     }else{
      alert('Coming Soon')
     }
     
  }
  return (
    <View style={{flex: 1}}>
      {/*********************** Profile Section  **********/}
      <View style={styles.topContainer}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              borderRadius: moderateScale(48) / 2,
              borderColor: 'white',
              height: moderateScale(48),
              width: moderateScale(48),
            }}>
            <ImageBackground
              source={
                user && user.profileImage && user.profileImage != 'null'
                  ? {uri: user.profileImage}
                  : Images.dummyuser
              }
              resizeMode={'cover'}
              imageStyle={{borderRadius: moderateScale(48) / 2}}
              style={{
                height: '100%',
                width: '100%',
              }}>
              <LinearGradient
                style={{flex: 1, borderRadius: moderateScale(48) / 2}}
                colors={[
                  'rgba(0,0,0,0.5)',
                  'rgba(0,0,0,0.05)',
                  'rgba(0,0,0,0.1)',
                ]}></LinearGradient>
            </ImageBackground>
          </View>
          <View style={{paddingVertical: moderateScale(8)}}>
            <Text h6 style={styles.profileText}>
              {user && user.name ? user.name : 'Hannery'}
            </Text>
            <Text p style={styles.numberText}>
              {user && user.mobileNumber
                ? `${user && user.countryCode ? user.countryCode : ''} ${
                    user.mobileNumber
                  }`
                : '+91'}
            </Text>
          </View>
        </View>
      </View>

      {/*********************** Menu Section  **********/}
      <ScrollView style={{flex: 1, paddingTop: moderateScale(20)}}>
        {menuArray.map(menu => (
          <TouchableOpacity
            onPress={() =>onMenuPress(menu)}
            style={[AppStyles.row, padding(10, 0, 10, 0)]}>
            <View
              style={{
                flex: 0.25,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <SmallIcon
                source={menu.icon}
                style={{
                  height: scale(20),
                  width: scale(20),
                  alignSelf: 'center',
                }}
              />
            </View>
            <View style={{flex: 0.8}}>
              <Text h6 style={styles.menuText}>
                {menu.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  profileText: {color: Colors.black},
  imageStyle: {height: scale(48), width: scale(48), alignSelf: 'flex-start'},
  topContainer: {
    flex: 0.2,
    justifyContent: 'center',
    paddingHorizontal: moderateScale(24),
    paddingTop: moderateScale(24),
    //  paddingVertical: moderateScale(24),
    backgroundColor: Colors.primary,
  },
  menuText: {
    fontSize: Typography.normalize(16),
    color: Colors.black,
  },
  numberText: {color: Colors.black, fontWeight: '500'},
});
