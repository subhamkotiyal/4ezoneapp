import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {Text, Button, TextInput, SmallIcon, Header} from '_atoms';
import {ListModal} from '_molecules';
import CountryPicker, {Flag} from 'react-native-country-picker-modal';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
import {Request} from '_services';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';

let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {ProfileView, BottomView} from '../templates';
import {logoutRequest} from '../../../store/modules/login/actions';

// Component
const Profile = ({navigation, route}) => {
  /****************************** Get Store State & Hooks*************************************/
  const dispatch = useDispatch();
  let emailField,
    phoneRef,
    passwordField,
    aboutField,
    nameField,
    addressField,
    gymField,
    doctorFeeField,
    educationField,
    contactField;
  const {language, profileData = {}} = useSelector(state => ({
    language: state.switchLanguage.language,
    profileData: state.getProfileReducer.profileData,
  }));
  const [isSkillsModal, setIsSkillsModal] = useState(false);

  const [state, setState] = useState({
    ...profileData,
    countryCode:
      profileData && profileData.countryCode ? profileData.countryCode : '+46',
    countryName:
      profileData && profileData.countryName ? profileData.countryName : 'SE',
  });
  useEffect(() => {
    getAllSpeciality();
  }, []);
  useEffect(() => {
    setState({...profileData});
    getAllSpeciality();

  }, [profileData]);
  useEffect(() => {
    setState({...profileData});
    getAllSpeciality();

  }, [profileData && profileData.profileImage]);

  /****************************** API Function *************************************/
  const logoutAgain = () => {
    dispatch(logoutRequest(navigation));
  };
  const getAllSpeciality = async () => {
    try {
      let sepeciality = await Request.get(Config.getAllSpecialist);
      console.log(sepeciality, 'sepeciality');

      if (sepeciality.status === SUCCESS) {
        if (sepeciality.data && sepeciality.data.length > 0) {
          let findSpec = sepeciality.data.filter(
            x => x._id == profileData.speciality,
          );
          setState(prevState => ({
            ...prevState,
            ['specialityItem']:{...findSpec[0],
            name:findSpec[0].specialistName,
            id:findSpec[0]._id
            },
            ['allSpeciality']: sepeciality.data.map((x,i)=> {
              return {
                ...x,
                name:x.specialistName,
                id:x._id
              }
            }),

          }));
        }
        console.log(sepeciality, 'sepeciality');
      }
    } catch (err) {
      console.log(err.message, 'Error in get chat history');
    }
  };
  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

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

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1}]}>
      {/*************** Backgroud Header *******************/}
      <ScrollView
        style={{backgroundColor: 'white'}}
        keyboardShouldPersistTaps={'never'}>
        <ImageBackground
          source={Images.progilebg}
          resizeMode={'stretch'}
          style={{width: undefined, height: windowHeight / 3.5}}>
          <Header
            leftText
            rightImage={Images.edit}
            image={Images.hamburgerwhite}
        onPressLeft={() => navigation.openDrawer()}
            onPressRight={() => navigation.navigate('EditProfile',{
              specialityItem:state.specialityItem,
              allSpeciality:state.allSpeciality,
              getAllSpeciality : () => getAllSpeciality()


            })}
            rightStyle={{flexDirection: 'row'}}
            style={[
              boxShadow('trasparent', {}, 0),
              {
                paddingHorizontal: moderateScale(16),
                backgroundColor: 'transparent',
              },
            ]}
            title={'Profile'}
            textStyle={{textAlign: 'center', color: 'white'}}
          />
          {/*************** Profile Header *******************/}
          <ProfileView
            mainStyle={{marginTop: moderateScale(windowHeight / 7.5)}}
            user={state}
          />
        </ImageBackground>

        <View
          style={[
            padding(24, 32, 8, 32),
            {
              flex: 1,
              marginTop: moderateScale(48),
            },
          ]}>
          <View style={{height: moderateScale(10)}} />
          <View style={{flex: 0.5, marginTop: moderateScale(16)}}>
            {/*************** Name field *******************/}
            <TextInput
              label={''}
              inputMenthod={input => {
                nameField = input;
              }}
              placeholder={'Name'}
              placeholderTextColor="rgba(62,62,62,0.55)"
              returnKeyType="next"
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              editable={false}
              blurOnSubmit={false}
              value={state.name}
              leftIcon={Images.nameIcon}
              viewTextStyle={AppStyles.viewTextStyle}
              underlineColorAndroid="transparent"
              isFocused={state.nameFieldFocus}
              onFocus={() => handleChange(true, 'nameFieldFocus')}
              onBlur={() => handleChange(false, 'nameFieldFocus')}
              onChangeText={text => handleChange(text, 'name')}
              onSubmitEditing={event => {
                emailField.focus();
              }}
            />
            <View style={{height: verticalScale(16)}} />
            {/*************** Email field *******************/}
            <TextInput
              label={''}
              editable={false}
              inputMenthod={input => {
                emailField = input;
              }}
              placeholder={'Email'}
              value={state.email}
              placeholderTextColor="rgba(62,62,62,0.55)"
              returnKeyType="next"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              blurOnSubmit={false}
              leftIcon={Images.mailLight}
              viewTextStyle={AppStyles.viewTextStyle}
              underlineColorAndroid="transparent"
              isFocused={state.emailFieldFocus}
              onFocus={() => handleChange(true, 'emailFieldFocus')}
              onBlur={() => handleChange(false, 'emailFieldFocus')}
              onChangeText={text => handleChange(text, 'email')}
              onSubmitEditing={event => {
                Keyboard.dismiss();
              }}
            />

            <View style={{height: verticalScale(16)}} />

            {/*************** Phone Input field *******************/}
            <View
              style={[
                AppStyles.signUptile,
                {
                  ...boxShadow('black', {height: 1, width: 1}, 6, 0.1),
                  borderRadius: moderateScale(48) / 8,
                },
              ]}>
              <TouchableOpacity
                disabled
                onPress={() => setVisible(true)}
                style={{
                  flex: windowWidth > 360 ? 0.35 : 0.38,
                  flexDirection: 'row',
                }}>
                <Flag
                  countryCode={state.countryName}
                  flagSize={16}
                  style={{marginRight: 0}}
                />
                <Text style={AppStyles.signUpcountryText}>
                  {state.countryCode}{' '}
                </Text>
                <Image
                  source={Images.selectnumber}
                  style={AppStyles.signUpselectnumber}
                />
              </TouchableOpacity>
              <View style={AppStyles.signUpphoneInput}></View>

              <TextInput
                ref={ref => {
                  phoneRef = ref;
                }}
                initialCountry={state.countryName}
                returnKeyType={'done'}
                value={state.phone}
                placeholder={'Phone Number'}
                editable={false}
                value={state.mobileNumber}
                viewTextStyle={[
                  AppStyles.signUptile,
                  {
                    flex: 0.5,
                    borderWidth: 0,
                    borderColor: 'white',
                    height: moderateScale(48),
                    ...boxShadow('transparent', {height: 0, width: 0}, 0, 0),
                  },
                ]}
                textInputStyle={[
                  {
                    paddingTop: moderateScale(8),
                    height: moderateScale(48),
                  },
                ]}
                onChangeText={text => handleChange(text, 'phone')}
                offset={scale(28)}
              />
            </View>
            <View style={{height: verticalScale(16)}} />
            {/*************** Address field *******************/}
            <TextInput
              label={''}
              inputMenthod={input => {
                addressField = input;
              }}
              placeholder={'Address'}
              placeholderTextColor="rgba(62,62,62,0.55)"
              returnKeyType="next"
              keyboardType="default"
              autoCorrect={false}
              value={state.address}
              autoCapitalize="none"
              editable={false}
              blurOnSubmit={false}
              leftIcon={Images.address2}
              editable={false}
              isFocused={state.addressFieldFocus}
              viewTextStyle={AppStyles.viewTextStyle}
              multiline
              textInputStyle={{
                textAlignVertical: 'center',
                height: 'auto',
                paddingTop: Platform.OS == 'ios' ? moderateScale(12) : 0,
                minHeight: moderateScale(48),
              }}
              underlineColorAndroid="transparent"
            />
            {/***************Speciality/ Experience*******************/}

            <View
              style={[
                AppStyles.row,
                {
                  width: '100%',
                  marginTop: verticalScale(16),
                },
              ]}>
              <View style={{flex: 0.6}}>
                <TextInput
                  label={''}
                  placeholderTextColor="rgba(62,62,62,0.55)"
                  returnKeyType="next"
                  placeholder={'Specialty'}
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  editable={false}
                  leftIcon={Images.speciality}
                  value={
                    state.specialityItem && state.specialityItem.specialistName
                      ? state.specialityItem.specialistName
                      : ''
                  }
                  // rightIcon={Images.downArrow}
                  viewTextStyle={[AppStyles.viewTextStyle, {}]}
                  editable={false}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={event => {
                    Keyboard.dismiss();
                  }}
                />
              </View>
              <View style={{flex: 0.1}} />
              {/*************** Gym field *******************/}
              <View style={{flex: 0.4}}>
                <TextInput
                  label={''}
                  inputMenthod={input => {
                    gymField = input;
                  }}
                  placeholderTextColor="rgba(62,62,62,0.55)"
                  returnKeyType="next"
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="none"
                  value={
                    state.exp && state.exp.name
                      ? state.exp.name
                      : state.exp
                      ? `${state.exp} yr`
                      : ''
                  }
                  blurOnSubmit={false}
                  leftIcon={Images.experience}
                  // rightIcon={Images.downArrow}
                  editable={false}
                  isFocused={state.gymFieldFocus}
                  viewTextStyle={[AppStyles.viewTextStyle, {}]}
                  editable={false}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={event => {
                    Keyboard.dismiss();
                  }}
                  placeholder={'Exp.'}
                />
              </View>
            </View>
            {/***************Doctor fee/ Edicya*******************/}

            <View
              style={[
                AppStyles.row,
                {
                  width: '100%',
                  marginTop: verticalScale(16),
                },
              ]}>
              <View style={{flex: 0.6}}>
                <TextInput
                  placeholder={'Education'}
                  inputMenthod={input => {
                    educationField = input;
                  }}
                  placeholderTextColor="rgba(62,62,62,0.55)"
                  selectionColor="#96C50F"
                  returnKeyType="next"
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="none"
                  blurOnSubmit={false}
                  leftIcon={Images.experience}
                  editable={false}
                  value={state.education}
                  isFocused={state.educationFieldFocus}
                  viewTextStyle={AppStyles.viewTextStyle}
                  onFocus={() => handleChange(true, 'educationFieldFocus')}
                  onBlur={() => handleChange(false, 'educationFieldFocus')}
                  onChangeText={text => handleChange(text, 'education')}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={event => {
                    doctorFeeField.focus();
                  }}
                  textInputStyle={{
                    textAlignVertical: 'center',
                    height: 'auto',
                    minHeight: moderateScale(48),
                  }}
                />
              </View>
              <View style={{flex: 0.1}} />
              {/*************** Gym field *******************/}
              <View style={{flex: 0.4}}>
                <TextInput
                  inputMenthod={input => {
                    doctorFeeField = input;
                  }}
                  placeholderTextColor="rgba(62,62,62,0.55)"
                  selectionColor="#96C50F"
                  returnKeyType="next"
                  keyboardType="default"
                  autoCorrect={false}
                  autoCapitalize="none"
                  editable={false}
                  blurOnSubmit={false}
                  value={`${state.doctorFee}`}
                  leftIcon={Images.experience}
                  isFocused={state.doctorFeeFieldFocus}
                  viewTextStyle={AppStyles.viewTextStyle}
                  onFocus={() => handleChange(true, 'doctorFeeFieldFocus')}
                  onBlur={() => handleChange(false, 'doctorFeeFieldFocus')}
                  onChangeText={text => handleChange(text, 'doctorFee')}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={event => {
                    doctorFeeField.focus();
                  }}
                  placeholder={'Fees'}
                />
              </View>
            </View>
          </View>

          <View style={{height: verticalScale(24)}} />
          <BottomView
            onPressRight={() => LogoutAction()}
            onPressLeft={() => navigation.navigate('ChangePassword')}
          />
        </View>
      </ScrollView>
      {isSkillsModal && (
        <ListModal
          isModalVisible={isSkillsModal}
          array={services}
          labelRightIcon={'ios-close'}
          onPressSelect={item => onPressSkillOrServicesSelect(item)}
          onPressRight={() => setIsSkillsModal(false)}
          closeModal={() => setIsSkillsModal(false)}></ListModal>
      )}
      {/*************** Bottom View *******************/}
    </View>
  );
};

export default Profile;
