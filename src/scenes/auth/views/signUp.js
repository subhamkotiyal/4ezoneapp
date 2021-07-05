import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  Keyboard,
  FlatList,
} from 'react-native';
import {Text, Button, TextInput, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import PhoneInput from 'react-native-phone-input';
import {ListModal} from '_molecules';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment-timezone';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ImageChooser from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {Validation, Methods} from '_utils';
import CountryPicker, {Flag,getAllCountries} from 'react-native-country-picker-modal';

import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, windowWidth} = Mixins;
import {Request} from '_services';

import {LogoHeader, SetAvailability,AuthButton} from '../templates';
import {registerRequest} from '../../../store/modules/register/actions';
import Config, {SUCCESS} from '_utils/constants/apiConstant';
// Component
const trainerSkills = [
  {name: 'Passion', id: 1},
  {name: 'Patience', id: 2},
  {name: 'Understanding diet', id: 3},
  {name: 'Awareness of safety', id: 4},
];
const gymsServices = [
  {name: 'Cardio Services', id: 1},
  {name: 'Weight Training', id: 2},
  {name: 'Personal Training', id: 3},
  {name: 'Lockers', id: 4},
];

const Signup = ({navigation}) => {
  /****************************** Get Store State & Hooks*************************************/
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
  const dispatch = useDispatch();
  const [state, setState] = useState({
    address: 'Jaipur',
    about: '',
    exp: null,
    email: '',
    password: '',
    countryCode: '+46',
    countryName: 'SE',
    education: '',
    doctorFee: '',
    businessProof:null
  });
  const curDate = new Date();

  const [isListModal, setIsListModal] = useState(false);
  const [isSkillsModal, setIsSkillsModal] = useState(false);
  const [selectedServices, setSelectServices] = useState([]);
  const [visible, setVisible] = useState(false);
  const [currentTimeName, setCurrentTimeName] = useState(null);
  const [isShowPopup, setIsShowPopup] = useState(false);
  const [roles, setRolesUpdate] = useState([
    {name: '1yr', id: 1, value: '1'},
    {name: '2yrs', id: 2, value: '2'},
    {name: '3yrs', id: 3, value: '3'},
    {name: '4yrs', id: 4, value: '4'},
    {name: '5yrs', id: 5, value: '5'},
  ]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);
  const [availability, setAvailability] = useState([
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
  ]);
  const [services, setServices] = useState([]);
  const {language} = useSelector(state => ({
    language: state.switchLanguage.language,
  }));
  useEffect(()=>{
    getAllSpeciality()
  },[])
  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let {
      name = '',
      email = '',
      password = '',
      phone = '',
      address = '',
      role = '',
      about = '',
      exp = null,
      education,
      doctorFee,
    } = state;
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
        field: password,
        name: 'Password',
        rules: 'required|no_space|min:8',
        lang: code,
      },
      {
        field: phone,
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
        field: exp,
        name: 'Experience',
        rules: 'required',
        lang: code,
      },
      {
        field: doctorFee,
        name: 'Doctor Fees',
        rules: 'required|no_space',
        lang: code,
      },
      {
        field: education,
        name: 'Education',
        rules: 'required|no_space',
        lang: code,
      },
    ];
  };
  const [filterCountries,setFilterCountries] = useState([])
  useEffect(()=>{
    filterAction()
  },[])
  const filterAction = async() => {
    const countries = await getAllCountries()
    const response = countries.filter((contry) =>{
      return contry.callingCode.length != 0 
    }).map((x)=> x.cca2)
    setFilterCountries(response)

  }
  /****************************** API Function *************************************/
  const pressButton = () => {
    let fiterAvailAbility = availability.filter(x => x.isSet == true);
    console.log(state, 'sgate');

    let {
      name = '',
      email = '',
      password = '',
      phone = '',
      address = '',
      role = '',
      curLatitude,
      about = '',
      curLongitude,
      countryCode,
      exp,
      countryName,
      doctorFee,
      businessProof,
      education,
    } = state;
    let validation = Validation.validate(ValidationRules());
    let {showToast} = Methods;
    console.log(`........................businessProof   ${businessProof}`)
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger');
    }else if(!selectedServices ){
      showToast('Please select speciality', 'danger');
    }else if (!businessProof) {
        showToast('Please upload document', 'danger');
    }else if (fiterAvailAbility && fiterAvailAbility.length == 0) {
      showToast('Please set availability start and end time', 'danger');
    }else {
      let formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('lat', curLatitude);
      formData.append('lng', curLongitude);
      formData.append('mobileNumber', phone);
      formData.append('countryCode', countryCode);
      formData.append('countryName', countryName);
      formData.append('password', password);
      formData.append('address', address);
      let ext = /[^.]+$/.exec(businessProof.uri);
      let specialistItem = selectedServices[0].id
      formData.append('businessproof', {
        uri:
          Platform.OS === 'android' ? businessProof.uri : businessProof.uri.replace('file://', ''),
        type: 'image/jpeg',
        name: `businessproof.${ext}`,
      });
      formData.append('exp', exp.value);
      formData.append('education', education);
      formData.append('doctorFee', doctorFee);
      formData.append('speciality',specialistItem);
      for (var i = 0; i < fiterAvailAbility.length; i++) {
        for(var bail in fiterAvailAbility[i]){
           formData.append(`availability[${i}][${bail}]`,fiterAvailAbility[i][bail])
      }
    }
    console.log(`........................formData   ${formData}`)

    console.log(formData,"availabilityavailabilityavailability")
    let apiName=Config.register
     dispatch(registerRequest(apiName, formData, navigation));
    }
  };

  const getAllSpeciality =async () =>{    
    try {
      let sepeciality = await Request.get(Config.getAllSpecialist);
      console.log(sepeciality, 'sepeciality');

      if (sepeciality.status === SUCCESS) {
        if (sepeciality.data && sepeciality.data.length > 0) {
         let servSpecilay = sepeciality.data.map((x,i)=> {
            return {
              ...x,
              name:x.specialistName,
              id:x._id
            }})
          setServices(servSpecilay)
        }
        console.log(sepeciality, 'sepeciality');
      }
    } catch (err) {
      console.log(err.message, 'Error in get chat history');
    }
}
      
  /****************************** Function Main  *************************************/
  /***********************Upload license ****************/
  const uploadDocument = () => {
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
        console.log(`..........................${JSON.stringify(response)}`)
        // console.log(`..........................${JSON.stringify(options)}`)
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
          ['businessProof']: source,
          ['profileClick']: true,
        }));
      })
      .catch(err => {
        console.log(err);
        return Alert.alert(
          'Unable to upload photo',
          // 'Check the console for full the error message',
        );
      });
  };

  /************************ Handle inpute and address  ****************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const setHandleAddress = (address, placeId, location) => {
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

  /************************ Select Role  ****************/

  const onPressSelect = item => {
    setState(prevState => ({
      ...prevState,
      exp: item,
    }));
    let newRoles = roles.map(x => {
      if (x.id == item.id) {
        return {...x, isSelected: true};
      } else {
        return {...x, isSelected: false};
      }
    });
    handleChange(item, 'exp');
    setRolesUpdate(newRoles);
    setIsListModal(false);
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
    setServices(updatedServices);
    setIsSkillsModal(false);
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
  /****************************** Render Child Component  *************************************/
  const RenderButton = ({title, transparent}) => {
    return (
      <View
        style={{
          justifyContent: 'flex-end',
          flex: 0.5,
        }}>
        <AuthButton
          title={title}
          transparent={transparent}
          pressButton={pressButton}
        />
      </View>
    );
  };
  
  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <ScrollView
        contentContainerStyle={[padding(8, 24, 8, 24)]}
        keyboardShouldPersistTaps={'never'}>
        <View style={{height: moderateScale(16)}} />

        <LogoHeader
          logoStyle={{
            height: moderateScale(180),
          }}
        />
        <View style={{height: moderateScale(8)}} />

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
            blurOnSubmit={false}
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
              passwordField.focus();
            }}
          />
          <View style={{height: verticalScale(16)}} />

          {/*************** Password field *******************/}
          <TextInput
            placeholder={'Password'}
            inputMenthod={input => {
              passwordField = input;
            }}
            placeholderTextColor="rgba(62,62,62,0.55)"
            selectionColor="#96C50F"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            secureTextEntry
            leftIcon={Images.lock}
            isFocused={state.passwordFieldFocus}
            viewTextStyle={AppStyles.viewTextStyle}
            onFocus={() => handleChange(true, 'passwordFieldFocus')}
            onBlur={() => handleChange(false, 'passwordFieldFocus')}
            onChangeText={text => handleChange(text, 'password')}
            underlineColorAndroid="transparent"
            onSubmitEditing={event => {
              Keyboard.dismiss()
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
              onPress={() => setVisible(true)}
              style={{
                flex: windowWidth > 360 ? 0.36 : 0.38,
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
                resizeMode={'contain'}
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
              placeholderTextColor="rgba(62,62,62,0.55)"
              value={state.phone}
              placeholder={'Phone Number'}
              viewTextStyle={[
                AppStyles.signUptile,
                {
                  // flex: 0.5,
                  borderWidth: 0,
                  borderColor: 'white',
                  height: moderateScale(48),
                  justifyContent:'center',
                  ...boxShadow('transparent', {height: 0, width: 0}, 0, 0),
                },
              ]}
              textInputStyle={[
                {
                  height: moderateScale(48),
                  // paddingTop:Platform.OS =='ios'?
                  //  moderateScale(12):moderateScale(16),

                },
              ]}
              onChangeText={text => handleChange(text, 'phone')}
              offset={scale(28)}
              keyboardType={'numeric'}
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
              paddingTop: Platform.OS == 'ios' ? moderateScale(12) :moderateScale(10),
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
              value={
                selectedServices && selectedServices.length > 0
                  ? selectedServices.map(x => x.name).toString()
                  : ''
              }
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
                value={state.exp && state.exp.name ? state.exp.name : ''}
                blurOnSubmit={false}
                onPress={() => setIsListModal(true)}
                onTouchStart={() => setIsListModal(true)}
                leftIcon={Images.experience}
                // rightIcon={Images.downArrow}
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
              isFocused={state.educationFieldFocus}
              viewTextStyle={AppStyles.viewTextStyle}
              onFocus={() => handleChange(true, 'educationFieldFocus')}
              onBlur={() => handleChange(false, 'educationFieldFocus')}
              onChangeText={text => handleChange(text, 'education')}
              underlineColorAndroid="transparent"
              onSubmitEditing={event => {
                doctorFeeField.focus();
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
                isFocused={state.doctorFeeFieldFocus}
                viewTextStyle={AppStyles.viewTextStyle}
                onFocus={() => handleChange(true, 'doctorFeeFieldFocus')}
                onBlur={() => handleChange(false, 'doctorFeeFieldFocus')}
                onChangeText={text => handleChange(text, 'doctorFee')}
                underlineColorAndroid="transparent"
                onSubmitEditing={event => {
                  Keyboard.dismiss();
                }}
                placeholder={'Fees'}
              />
            </View>
          </View>
        </View>
        {/*************** Document section Text *******************/}
        <View style={{height: verticalScale(16)}} />
        <View style={[AppStyles.forgotPassView, {alignItems: 'flex-start'}]}>
          <TouchableOpacity
            onPress={() => uploadDocument()}
            style={[AppStyles.row, {flex: 0.1}]}>
            <View style={{alignItems: 'center', 
              height: moderateScale(28),
              width: moderateScale(28),
              borderRadius:8,
            justifyContent: 'center'}}>
              <Image
                resizeMode={'contain'}
                style={{
                  height: moderateScale(28),
                  width: moderateScale(28),
                }}
                source={state.businessProof && state.businessProof.uri ? {uri:state.businessProof.uri} :Images.upload}
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
                {'Upload Document*'}
              </Text>
            </View>
          </TouchableOpacity>

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
        <View style={{height: verticalScale(24)}} />
        {/*************** Next Button *******************/}
        <RenderButton title={'Submit'} transparnet={true} />
        <View style={{height: verticalScale(24)}} />
        {/*************** Not have account Text *******************/}
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.5}
          style={[AppStyles.forgotPassView, {alignItems: 'center'}]}>
          <Text
            p
            style={[
              AppStyles.becomePartner,
              {
                color: 'rgba(0,0,0,0.6)',
              },
            ]}>
            Already have an account?{' '}
            <Text
              h6
              style={[AppStyles.becomePartner, {color: 'rgba(0,0,0,0.9)'}]}>
              {' '}
              Sign in{' '}
            </Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      {isListModal && (
        <ListModal
          isModalVisible={isListModal}
          array={roles}
          labelRightIcon={'ios-close'}
          onPressSelect={item => onPressSelect(item)}
          onPressRight={() => setIsListModal(false)}
          closeModal={() => setIsListModal(false)}></ListModal>
      )}
      {isSkillsModal && (
        <ListModal
          isModalVisible={isSkillsModal}
          array={services}
          labelRightIcon={'ios-close'}
          onPressSelect={item => onPressSkillOrServicesSelect(item)}
          onPressRight={() => setIsSkillsModal(false)}
          closeModal={() => setIsSkillsModal(false)}></ListModal>
      )}
      {visible && (
        <CountryPicker
          {...{
            onSelect,
          }}
          withFilter
          countryCodes={filterCountries}
          ref={ref => (countryRef = ref)}
          onClose={() => setVisible(false)}
          containerButtonStyle={{marginTop: 8}}
          visible={visible}
        />
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
    </View>
  );
};

export default Signup;

