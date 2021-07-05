import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Keyboard,
  Alert
} from 'react-native';
import {Text, Button, TextInput, SmallIcon, Header} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {ListModal} from '_molecules';
import {Images} from '_utils';
import ImageChooser from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { Validation, Methods } from '_utils'
import { useDispatch, shallowEqual, useSelector } from "react-redux";

import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow} = Mixins;
const trainerSkills = [
  {name: 'Passion', id: 1},
  {name: 'Patience', id: 2},
  {name: 'Understanding diet', id: 3},
  {name: 'Awareness of safety', id: 4},
];
import {addTrainerRequest} from '../../../store/modules/trainers/actions';

// Component
const AddTrainer = ({navigation}) => {
  /******************* Get Store State & Hooks*************************/
  let emailField,
    passwordField,
    nameField,
    addressField,
    gymField,
    aboutField,
    contactField;
  const [state, setState] = useState({
    email: '',
    password: '',profileImage:'',
    emailFieldFocus: false,
    passwordFieldFocus: false,
  });
  const dispatch = useDispatch()
  const [selectedServices, setSelectServices] = useState([]);
  const [services, setServices] = useState(trainerSkills);
  const [isSkillsModal, setIsSkillsModal] = useState(false);
  const {user } = useSelector(state => ({
    user: state.getProfileReducer.profileData,
  }));
/****************************** Validation *************************************/
  const ValidationRules = () => {
    let {name = '',profileImage, email = '', phone = '', address = '', about = ''} = state;
    let code = 'en';
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
        field: about,
        name: 'About',
        rules: 'required',
        lang: code,
      },
      {
        field: profileImage,
        name: 'Image',
        rules: 'required',
        lang: code,
      },
    ];
  };

  /****************************** API Function *************************************/
  const pressButton = () => {
    let {
        name = '',
        email = '',
        phone = '',
        address = '',
        curLatitude,
        about='',
        curLongitude,
        profileImage
      } = state;
      let validation = Validation.validate(ValidationRules());
      let {showToast} = Methods;
      if (validation.length != 0) {
        showToast(validation[0].message, 'danger');
      }else if(selectedServices && selectedServices.length <1){
        showToast('Please select skills first', 'danger');
      } else {
        const data = new FormData();
        let ext = /[^.]+$/.exec(profileImage);
        data.append('image', {
          uri:
            Platform.OS === 'android' ? profileImage :profileImage.replace('file://', ''),
          type: 'image/jpeg',
          name: `profile.${ext}`,
        });
        data.append('name',name)
        data.append('email',email)
        data.append('lat',curLatitude)
        data.append('lng',curLongitude)
        data.append('mobileNumber',phone)
        data.append('address',address)
        data.append('gymId',user._id)
        data.append('about',about)
        for (var i = 0; i < selectedServices.length; i++) {
            data.append('skills[]', selectedServices[i].name);
        }
        dispatch(addTrainerRequest(data,navigation,user._id))
      }
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
          ['profileImage']: source.uri
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
  /****************************** Function Main  *************************************/
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
  const onPressSkillOrServicesSelect = item => {
    const objArray = [...services];
    const updatedServices = objArray.map((x, i) => {
      if (x.id == item.id) {
        return {...x, isSelected: !item.isSelected};
      } else {
        return {...x};
      }
    });
    if (setSelectServices && setSelectServices.length > 0) {
      let objServices = [...selectedServices];
      let objIndex = objServices.findIndex(x => x.id == item.id);
      if (objIndex > -1) {
        objServices.splice(objIndex, 1);
        setSelectServices(objServices);
      } else {
        setSelectServices([...objServices, item]);
      }
    } else {
      setSelectServices([item]);
    }
    setServices(updatedServices);
  };
  /****************************** Render Child Component  **************************/

  const RenderButton = ({title, transparent}) => {
    return (
      <View
        style={{
          justifyContent: 'center',
          flex: 1,
        }}>
        <Button onPress={() => pressButton()} title={title} />
      </View>
    );
  };
  // Profile View
  const ProfileView = () => {
    return (
      <TouchableOpacity 
      onPress={()=> profileImagePck()}
      style={{flex: 1, 
      alignSelf: 'center'}}>
        {
        state.profileImage ? 
        <Image
        source={{uri: state.profileImage}}
        style={{height: moderateScale(96), 
              borderRadius: moderateScale(96)/2,
            width: moderateScale(96)}}
        />:
        <SmallIcon
        source={Images.adduser}
        style={{height: moderateScale(96), width: moderateScale(96)}}
      />
        }

      </TouchableOpacity>
    );
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('trasparent', {}, 0)]}
        title={'Add Trainer'}
        textStyle={{textAlign: 'center'}}
      />
      <ScrollView
        contentContainerStyle={[padding(8, 24, 8, 24)]}
        keyboardShouldPersistTaps={'never'}
        style={{backgroundColor: Colors.white}}>
        {/*************** Profile field *******************/}

        <View style={{height: verticalScale(16)}} />
        <ProfileView />
        <View style={{height: verticalScale(36)}} />

        <View style={{flex: 1}}>
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
          <View style={{height: verticalScale(24)}} />
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
              contactField.focus();
            }}
          />
          <View style={{height: verticalScale(24)}} />

          {/*************** Contact field *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              contactField = input;
            }}
            placeholder={'Phone Number'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="phone-pad"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={Images.callblack}
            isFocused={state.contactFieldFocus}
            viewTextStyle={AppStyles.viewTextStyle}
            underlineColorAndroid="transparent"
            onFocus={() => handleChange(true, 'contactFieldFocus')}
            onBlur={() => handleChange(false, 'contactFieldFocus')}
            onChangeText={text => handleChange(text, 'phone')}
            onSubmitEditing={event => {
              addressField.focus();
            }}
          />
          <View style={{height: verticalScale(24)}} />
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
                address:state.address,
                setHandleAddress: (address, placeId, location) =>
                  setHandleAddress(address, placeId, location),
              })
            }
            keyboardType="default"
            autoCorrect={false}
            value={state.address}
            onTouchStart={() =>
              navigation.navigate('AddressModal', {
                address:state.address,
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
              textAlignVertical:'center',
              height:'auto',
          }}
            underlineColorAndroid="transparent"
          />
          <View style={{height: verticalScale(24)}} />
          {/*************** Gym field *******************/}

          <TextInput
            label={''}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            placeholder={'Select services or skills'}
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
            leftIcon={Images.menuMore}
            rightIcon={Images.downArrow}
            viewTextStyle={AppStyles.viewTextStyle}
            editable={false}
            underlineColorAndroid="transparent"
            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
            <View style={{height: verticalScale(24)}} />
                    <TextInput
            label={''}
            inputMenthod={input => {
              aboutField = input;
            }}
            placeholder={'About'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            leftIcon={Images.additional}
            multiline
            textInputStyle={{paddingTop:16}}
            viewTextStyle={AppStyles.viewTextStyle}
            underlineColorAndroid="transparent"
            isFocused={state.aboutFieldFocus}
            onFocus={() => handleChange(true, 'aboutFieldFocus')}
            onBlur={() => handleChange(false, 'aboutFieldFocus')}
            onChangeText={text => handleChange(text, 'about')}
            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{height: verticalScale(48)}} />

        <RenderButton title={'Save'} />
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
    </View>
  );
};

export default AddTrainer;
