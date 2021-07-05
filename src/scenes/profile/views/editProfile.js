import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Platform,
  Image,
  ScrollView,
  ImageBackground,
  Keyboard,
} from 'react-native';
import moment from 'moment-timezone';

import {Text, Button, TextInput, SmallIcon, Header} from '_atoms';
import {ListEmptyComponent} from '_molecules';
import PhoneInput from 'react-native-phone-input';
import ImageChooser from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import CountryPicker, {Flag} from 'react-native-country-picker-modal';
import {SetAvailability} from '../../auth/templates';

import {Validation, Methods} from '_utils';
import Config from '_utils/constants/apiConstant';
import {ListModal} from '_molecules';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {
  profileImRequest,
  profileRequest,
} from '../../../store/modules/editProfile/actions';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;
import {ProfileView, BottomView} from '../templates';
import { set } from 'react-native-reanimated';
const gymsServices = [
  {name: 'Cardio Services', id: 1},
  {name: 'Weight Training', id: 2},
  {name: 'Personal Training', id: 3},
  {name: 'Lockers', id: 4},
];
const availabilityData =[
  {
    key: 1,
    day: 'Sunday',
    openTime: '',
    closeTime: '',
  },
  {
    key: 2,
    day: 'Monday',
    openTime: '',
    closeTime: '',
  },
  {
    key: 3,
    day: 'Tuesday',
    openTime: '',
    closeTime: '',
  },
  {
    key: 4,
    day: 'Wednesday',
    openTime: '',
    closeTime: '',
  },
  {
    key: 5,
    day: 'Thursday',
    openTime: '',
    closeTime: '',
  },
  {
    key: 6,
    day: 'Friday',
    openTime: '',
    closeTime: '',
  },
  {
    key: 7,
    day: 'Saturday',
    openTime: '',
    closeTime: '',
  },
]
// Component
const EditProfile = ({navigation, route}) => {
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
  const {language, profileData} = useSelector(state => ({
    language: state.switchLanguage.language,
    profileData: state.getProfileReducer.profileData,
  }));
  console.log(route.params,"route.params")
  const [state, setState] = useState({
    ...profileData,
    ...route.params,
    curLatitude:profileData.doctorLocation ?profileData.doctorLocation.coordinates[1]:'',
    curLongitude:profileData.doctorLocation ?profileData.doctorLocation.coordinates[0]:'',
    countryCode:
      profileData && profileData.countryCode ? profileData.countryCode : '+46',
    countryName:
      profileData && profileData.countryName ? profileData.countryName : 'SE',
  });
  
  const [isSkillsModal, setIsSkillsModal] = useState(false);
  const [experienceArray, setExpUpdate] = useState([
    {name: '1yr', id: 1, value: '1'},
    {name: '2yrs', id: 2, value: '2'},
    {name: '3yrs', id: 3, value: '3'},
    {name: '4yrs', id: 4, value: '4'},
    {name: '5yrs', id: 5, value: '5'},
  ]);

  const [currentItem, setCurrentItem] = useState(null);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [availability, setAvailability] = useState([]);
  const [isListModal, setIsListModal] = useState(false);
  const [currentTimeName, setCurrentTimeName] = useState(null);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [services, setServices] = useState(route.params.allSpeciality);
  const [selectedServices, setSelectServices] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(()=>{
    updateAvailabiltyData()
  },[])
  /****************************** Validation *************************************/
 const updateAvailabiltyData=()=>{
   if(profileData.availability && profileData.availability.length > 0){
      let newArray= availabilityData.map((item,i)=>{
        let findInx = profileData.availability.findIndex(x=>x.key == item.key)
        if(findInx > -1){
          return {
            ...item,
            ...profileData.availability[findInx]
          }
        }else{
          return {
            ...item
          }
        }
      })
      setAvailability(newArray)
   }else{
    setAvailability(availabilityData)

   }
 }
  const ValidationRules = () => {
    let {name = '', email = '', mobileNumber = '', address = '',education=''} = state;
    let {code} = language;
    return [
      {
        field: name,
        name: 'Name',
        rules: 'required|no_space',
        lang: code,
      },
      {
        field: email,
        name: 'Email',
        rules: 'required|email|no_space',
        lang: code,
      },
      {
        field: mobileNumber,
        name: 'Phone Number',
        rules: 'required|no_space|min:6',
        lang: code,
      },
      {
        field: address,
        name: 'Address',
        rules: 'required',
        lang: code,
      },
      {
        field: education,
        name: 'Address',
        rules: 'required|no_space',
        lang: code,
      },
    ];
  };

  /****************************** API Function *************************************/
  const saveProfileData = () => {
    let validation = Validation.validate(ValidationRules());
    let {showToast} = Methods;
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger');
    } else {
      const {email,curLatitude,curLongitude,doctorFee,countryName, specialityItem,name,education, mobileNumber, countryCode, address} = state;
      let fiterAvailAbility = availability.filter(x => x.isSet == true);

      let profileData = {
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        countryCode: countryCode,
        countryName: countryName,
        lat :curLatitude,
        lng :curLongitude,
        address: address,
        exp: state.exp && state.exp.value? state.exp.value: state.exp
        ? `${state.exp}`:'',
        education:education,
        doctorFee:doctorFee,
        speciality:specialityItem._id,
      
      };
      if(fiterAvailAbility && fiterAvailAbility.length > 0){
        profileData['availability']=fiterAvailAbility
      }
      let data = {
        profileData: profileData,
        isRegister: false,
      };
      let apiName;
        apiName = Config.updateprofile;
      
      dispatch(profileRequest(apiName, data, navigation));
   
    }
  };

  /****************************** Function Main  *************************************/
  // const getCountryCode = () => {
  //   let country = phoneRef.getCountryCode();
  //   let name = phoneRef.getISOCode();
  //   setState(prevState => ({
  //     ...prevState,
  //     ['countryCode']: '+' + country,
  //     countryName: name
  //   }));

  // }
  const setHandleAddress = (address, placeId, location) => {
    console.log(location,"location")
    setState(prevState => ({
      ...prevState,
      ['address']: address,
      ['placeId']: placeId,
      ...location,
    }));
  };
  const onSelect = country => {
    setState(prevState => ({
      ...prevState,
      ['countryCode']: '+' + country.callingCode,
      ['countryName']: country.cca2,
    }));
    setVisible(false);
  };
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const onPressSkillOrServicesSelect = item => {
    const objArray = [...services];
    const updatedServices = objArray.map((x, i) => {
      if (x.id == item.id) {
        debugger;
        return {...x, isSelected: !item.isSelected};
      } else {
        return {...x, isSelected: false};
      }
    });
    // if (setSelectServices && setSelectServices.length > 0) {
    //   let objServices = [...selectedServices];
    //   let objIndex = objServices.findIndex(x => x.id == item.id);
    //   if (objIndex > -1) {
    //     objServices.splice(objIndex, 1);
    //     setSelectServices(objServices);
    //   } else {
    //     setSelectServices([...objServices, item]);
    //   }
    // } else {
    //   setSelectServices([item]);
    // }
    setSelectServices([item]);
    setState(prevState => ({
      ...prevState,
      ['specialityItem']: item,
    }));
    setServices(updatedServices);
    setIsSkillsModal(false);
  };
  const onPressSelect = item => {
    setState(prevState => ({
      ...prevState,
      exp: item,
    }));
    let newRoles = experienceArray.map(x => {
      if (x.id == item.id) {
        return {...x, isSelected: true};
      } else {
        return {...x, isSelected: false};
      }
    });
    handleChange(item, 'exp');
    setExpUpdate(newRoles);
    setIsListModal(false);
  };

  //Add Profile  image
  const profileImagePck = () => {
    try {
      const options = {
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true,
        },
      };
      ImageChooser.showImagePicker(options, response => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          resize(response.uri);
          // this.saveImage(source);
        }
      });
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  //Resize Image
  const resize = sourceURI => {
    ImageResizer.createResizedImage(sourceURI, 300, 300, 'PNG', 80)
      .then(({uri}) => {
        const source = {
          uri: uri,
          imageName: 'profile',
        };
        setState(prevState => ({
          ...prevState,
          ['profileImage']: source.uri,
        }));
        saveImage(source);
      })
      .catch(err => {
        console.log(err);
        return Alert.alert(
          'Unable to upload photo',
          // 'Check the console for full the error message',
        );
      });
  };
  //Save Image
  const saveImage = data => {
    const profiledata = new FormData();
    let ext = /[^.]+$/.exec(data.uri);

    profiledata.append('profileImage', {
      uri:
        Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
      type: 'image/jpeg',
      name: `profile.${ext}`,
    });
    let apiName;
      apiName = Config.profileimage;
    dispatch(profileImRequest(apiName, profiledata));
    
  };
  /************************ AvailAblity  ****************/
  const handleDatePicked = date => {
    showDateTimePicker(false);
    let {showToast} =Methods
    let newDate = moment(date, ['h:mm a']).format('hh:mm a');
    let newAvailability = availability.map((x, i) => {
      if (currentTimeName == 'close'){
        let now = new Date();
        let closetime = newDate
        let opentime;
        if(x.key == currentItem.key){
          opentime =x.openTime
        }
        let dt = (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + closetime;
        let ds = (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + opentime;
        let userOpen = new Date(ds);
        userOpen = userOpen.setMinutes(userOpen.getMinutes() + 15 );
        let userClose = new Date(dt);
        if(opentime && userOpen > userClose){
          if(x.key == currentItem.key){
            showToast('End Time Should be greater then start time atleast 15 minutes', 'danger');
          }
          return {
            ...x
          }
        }else{
          // If key equal to key and close time
          if (x.key == currentItem.key) {
            return {
              ...x,
              isSet: x.openTime  ? true :false,
              openTime: currentTimeName == 'open' ? newDate : x.openTime,
              closeTime: currentTimeName == 'close' ? newDate : x.closeTime,
            };
          } else {
            return {
              ...x,
            };
          }
        }
      }else if(currentTimeName == 'open') {
        let now = new Date();
      
        console.log(currentItem,"currentItem",x)
        if (x.key == currentItem.key) {
          let  closetime = x.closeTime
          let opentime =newDate
        let dt = (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + closetime;
        let ds = (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear() + " " + opentime;
        let userOpen = new Date(ds);
        let userClose = new Date(dt);
        if(closetime && userOpen >= userClose){
          if(x.key == currentItem.key){
            showToast('Start Time Should be greater then end time', 'danger');
          }
          return {
            ...x
          }
        }else{
          // If key equal to key and close time
          if (x.key == currentItem.key) {
            return {
              ...x,
              isSet: x.closeTime ? true : false,
              openTime: currentTimeName == 'open' ? newDate : x.openTime,
              closeTime: currentTimeName == 'close' ? newDate : x.closeTime,
            };
          } else {
            return {
              ...x,
            };
          }
        }
      }else{
        return {
          ...x,
        };
      }
       } else {
          return {
            ...x,
          };
        }
    });
    setAvailability(newAvailability);
    // showDateTimePicker(false);
    // let newDate = moment(date, ['h:mm a']).format('hh:mm a');
    // let newAvailability = availability.map((x, i) => {
    //   if (x.key == currentItem.key) {
    //     return {
    //       ...x,
    //       isSet: true,
    //       openTime: currentTimeName == 'open' ? newDate : x.openTime,
    //       closeTime: currentTimeName == 'close' ? newDate : x.closeTime,
    //     };
    //   } else {
    //     return {
    //       ...x,
    //     };
    //   }
    // });
    // setAvailability(newAvailability);
  };
  const showDateTimePicker = status => {
    setIsDateTimePickerVisible(status);
  };
  const opneDateTimePicker = (status, item, timeName) => {
    setIsDateTimePickerVisible(status);
    setCurrentItem(item);
    setCurrentTimeName(timeName);
  };
  const onSubmitAvailablity = () => {
    setIsShowPopup(false);
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1}]}>
      {/*************** Backgroud Header *******************/}
      <ScrollView
        style={{backgroundColor: 'white'}}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'never'}>
        <ImageBackground
          source={Images.progilebg}
          resizeMode={'stretch'}
          style={{width: undefined, height: windowHeight / 3.5}}>
          <Header
            leftText
            image={Images.backwhite}
            onPressLeft={() => navigation.goBack()}
            rightStyle={{flexDirection: 'row'}}
            style={[
              boxShadow('trasparent', {}, 0),
              {
                paddingHorizontal: moderateScale(0),
                backgroundColor: 'transparent',
              },
            ]}
            title={'Edit Profile'}
            textStyle={{textAlign: 'center', color: 'white'}}
          />
          {/*************** Profile Header *******************/}
          <ProfileView
            fromEdit
            onOpenImage={() => profileImagePck()}
            mainStyle={{marginTop: moderateScale(windowHeight / 7.5)}}
            user={state}
          />
        </ImageBackground>
        {/*************** Profile Header *******************/}
        <View
          style={[
            padding(24, 32, 8, 32),
            {
              flex: 1,
              marginTop: moderateScale(52),
            },
          ]}>
          {/* <View style={{ height: moderateScale(16) }} /> */}
          <View style={{flex: 0.5}}>
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
              inputMenthod={input => {
                emailField = input;
              }}
              placeholder={'Email'}
              value={state.email}
              placeholderTextColor="rgba(62,62,62,0.55)"
              returnKeyType="next"
              editable={false}
              disabled
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
                phoneRef.focus();
              }}
            />
            <View style={{height: verticalScale(16)}} />
            {/*************** Phone Input field *******************/}
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
                // disabled
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
                value={state.mobileNumber}
                placeholder={'Phone Number'}
                // editable={false}
                viewTextStyle={[
                  AppStyles.signUptile,
                  {
                    flex: 0.5,
                    borderWidth: 0,
                    borderColor: 'white',
                    height: moderateScale(48),
                    justifyContent:'center',

                    ...boxShadow('transparent', {height: 0, width: 0}, 0, 0),
                  },
                ]}
                textInputStyle={[
                  {
                    paddingTop:moderateScale(8),
                    height: moderateScale(48),
                  },
                ]}
                onChangeText={text => handleChange(text, 'mobileNumber')}
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
              onPress={() =>
                navigation.navigate('AddressModal', {
                  address: state.address,
                  setHandleAddress: (address, placeId, location) =>
                    setHandleAddress(address, placeId, location),
                })
              }
              keyboardType="default"
              autoCorrect={false}
              value={state.address}
              onTouchStart={() =>
                navigation.navigate('AddressModal', {
                  address: state.address,
                  setHandleAddress: (address, placeId, location) =>
                    setHandleAddress(address, placeId, location),
                })
              }
              autoCapitalize="none"
              editable={false}
              blurOnSubmit={false}
              leftIcon={Images.address2}
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
                  value={state.specialityItem && state.specialityItem.name? state.specialityItem.name :''}
                  onPress={() => setIsSkillsModal(true)}
                  onTouchStart={() => setIsSkillsModal(true)}
                  leftIcon={Images.speciality}
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
                  blurOnSubmit={false}
                  onPress={() => setIsListModal(true)}
                  onTouchStart={() => setIsListModal(true)}
                  leftIcon={Images.experience}
                  // rightIcon={Images.downArrow}
                  isFocused={state.gymFieldFocus}
                  value={
                    state.exp && state.exp.name
                      ? state.exp.name
                      : state.exp
                      ? `${state.exp} yr`
                      : ''
                  }
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
                  value={state.education}
                  multiline
                  leftIcon={Images.experience}
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
                    paddingTop: Platform.OS == 'ios' ? moderateScale(12) : 0,
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
                  blurOnSubmit={false}
                  leftIcon={Images.experience}
                  value={`${state.doctorFee}`}

                  isFocused={state.doctorFeeFieldFocus}
                  viewTextStyle={AppStyles.viewTextStyle}
                  onFocus={() => handleChange(true, 'doctorFeeFieldFocus')}
                  onBlur={() => handleChange(false, 'doctorFeeFieldFocus')}
                  onChangeText={text => handleChange(text, 'doctorFee')}
                  underlineColorAndroid="transparent"
                  onSubmitEditing={event => {
                    doctorFeeField.focus();
                  }}
                  maxLength={8}
                  placeholder={'Fees'}
                />
              </View>
            </View>
          </View>
          {/*************** Document section Text *******************/}
          <View style={{height: verticalScale(16)}} />
          <View style={[AppStyles.forgotPassView, {alignItems: 'flex-start'}]}>
            <View style={{height: verticalScale(12)}} />
            <TouchableOpacity
              onPress={() => setIsShowPopup(true)}
              style={[AppStyles.row]}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Image
                  resizeMode={'contain'}
                  style={{
                    height: moderateScale(28),
                    width: moderateScale(28),
                  }}
                  source={Images.availability}
                />
              </View>
              <View style={{flex: 0.9, paddingLeft: moderateScale(8)}}>
                <Text
                  p
                  style={[
                    AppStyles.upload,
                    {
                      color: Colors.primary,
                    },
                  ]}>
                  {'Set availability*'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
              style={{
                flexDirection: 'row',
                marginTop: 28,
                flex: 1,
                alignSelf: 'flex-end',
              }}>
              <View style={{flex: 0.8}} />
              <TouchableOpacity
                onPress={() => saveProfileData()}
                style={[
                  {
                    height: moderateScale(48),
                    width: moderateScale(48),
                    borderRadius: moderateScale(48) / 2,
                    backgroundColor: Colors.primary,
                  },
                ]}>
                <Image
                  source={Images.tick}
                  resizeMode={'contain'}
                  style={{alignSelf: 'center', width: '100%', height: '100%'}}
                />
              </TouchableOpacity>

            </View>
        </View>
       
            <View style={{height: verticalScale(24)}} />

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
      {isListModal && (
        <ListModal
          isModalVisible={isListModal}
          array={experienceArray}
          labelRightIcon={'ios-close'}
          onPressSelect={item => onPressSelect(item)}
          onPressRight={() => setIsListModal(false)}
          closeModal={() => setIsListModal(false)}></ListModal>
      )}
      {isShowPopup == true ? (
        <SetAvailability
          onSubmitAvailablity={onSubmitAvailablity}
          availability={availability}
          isDateTimePickerVisible={isDateTimePickerVisible}
          opneDateTimePicker={opneDateTimePicker}
          handleDatePicked={handleDatePicked}
          showDateTimePicker={showDateTimePicker}
        />
      ) : null}
      {/* <BottomAbsoluteButton
        image={Images.tick}
        onPress={() => saveProfileData()}
      /> */}
      {visible && (
        <CountryPicker
          {...{
            onSelect,
          }}
          withFilter
          ref={ref => (countryRef = ref)}
          onClose={() => setVisible(false)}
          containerButtonStyle={{marginTop: 8}}
          visible={visible}
        />
      )}
      {/*************** Bottom View *******************/}
    </View>
  );
};

export default EditProfile;
