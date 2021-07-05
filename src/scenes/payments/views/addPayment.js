import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Keyboard,
  Image,
  ScrollView,
  AppStylesheet,
} from 'react-native';
import {Text, Button, Header, TextInput, SmallIcon} from '_atoms';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin,windowHeight} = Mixins;
import {Validation, Methods} from '_utils';
import Config from '_utils/constants/apiConstant';

import {
  addAccountRequest,
  updateAccountRequest,
} from '../../../store/modules/paymentDetails/actions';

// Component
const AddPayment = ({navigation, route}) => {
  /****************************** Get Store State & Hooks*************************************/
  let accountHolderName,ibanField,accountNumerField,bankNameField;
  const dispatch = useDispatch();
  const [state, setState] = useState(
    route.params && route.params.itemDetail ? {...route.params.itemDetail} : {},
  );
  const {user} = useSelector(state => ({
    user: state.getProfileReducer.profileData,
  }));
  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let {
      routingNumber = '',
      name = '',
      accountNumber = '',
      bankName = '',
    } = state;
    let code = 'en';
    return [
      {
        field: routingNumber,
        name: 'Routing Number',
        rules: 'required|no_space',
        lang: code,
      },

      {
        field: accountNumber,
        name: 'Account Number',
        rules: 'required|no_space',
        lang: code,
      },
      {
        field: name,
        name: 'Account Holder Name',
        rules: 'required|no_space',
        lang: code,
      },
      {
        field: bankName,
        name: 'Bank Name',
        rules: 'required|no_space',
        lang: code,
      },
    ];
  };
  /****************************** API Function *************************************/
  const pressButton = () => {
    let {
      routingNumber = '',
      name = '',
      accountNumber = '',
      bankName = '',
    } = state;
    let validation = Validation.validate(ValidationRules());
    let {showToast} = Methods;
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger');
    } else {
      let {role} = user;
      let data = {};
      let apiName;
      data = {
        routingNumber: routingNumber,
        accountNumber: accountNumber,
        name: name,
        bankName: bankName,
      };
      apiName = Config.doctorAddaccount;
      dispatch(addAccountRequest(apiName, data, navigation));
    }
  };
  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('trasparent', {}, 0), padding(0)]}
        title={'Payment Detail'}
        textStyle={{textAlign: 'center'}}
      />

      <ScrollView
        contentContainerStyle={[padding(16, 16, 0, 16)]}
        keyboardShouldPersistTaps={'never'}
        style={{backgroundColor: Colors.white}}>
        {/********************** Image View  *************************/}
        <View style={[{marginTop: moderateScale(32), flex: 1}]}>
          <View style={AppStyles.imageViewStyle}>
            <Image
              source={Images.payment}
              style={AppStyles.imageStyle}
              resizeMode={'contain'}
            />
          </View>
        </View>
        {/**************************** TextInput *************************/}
        <View style={{height: verticalScale(20)}} />

        <View style={{flex: 0.5, marginTop: moderateScale(32)}}>
          {/*************** Routing Number *******************/}

          <TextInput
            label={''}
            inputMenthod={input => {
              ibanField = input;
            }}
            placeholder={'Routing Number*'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            value={state.routingNumber}
            viewTextStyle={AppStyles.viewAddressTextStyle}
            underlineColorAndroid="transparent"
            onFocus={() => handleChange(true, 'nameFieldFocus')}
            onBlur={() => handleChange(false, 'nameFieldFocus')}
            onChangeText={text => handleChange(text, 'routingNumber')}
            onSubmitEditing={event => {
              accountNumerField.focus();
            }}
          />
          <View style={{height: verticalScale(8)}} />
          {/*************** Achhount Holder Name *******************/}

          <TextInput
            label={''}
            inputMenthod={input => {
              accountNumerField = input;
            }}
            placeholder={'Account Number*'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            value={state.accountNumber}
            viewTextStyle={AppStyles.viewAddressTextStyle}
            underlineColorAndroid="transparent"
            onFocus={() => handleChange(true, 'nameFieldFocus')}
            onBlur={() => handleChange(false, 'nameFieldFocus')}
            onChangeText={text => handleChange(text, 'accountNumber')}
            onSubmitEditing={event => {
              accountHolderName.focus();
            }}
          />
          <View style={{height: verticalScale(8)}} />
          {/*************** Achhount Holder Name *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              accountHolderName = input;
            }}
            placeholder={'Account Holder Name*'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            value={state.name}
            viewTextStyle={AppStyles.viewAddressTextStyle}
            underlineColorAndroid="transparent"
            onFocus={() => handleChange(true, 'nameFieldFocus')}
            onBlur={() => handleChange(false, 'nameFieldFocus')}
            onChangeText={text => handleChange(text, 'name')}
            onSubmitEditing={event => {
              bankNameField.focus();
            }}
          />
          {/*************** Achhount Holder Name *******************/}
          <View style={{height: verticalScale(8)}} />

          <TextInput
            label={''}
            inputMenthod={input => {
              bankNameField = input;
            }}
            placeholder={'Bank Name*'}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            value={state.bankName}
            viewTextStyle={AppStyles.viewAddressTextStyle}
            underlineColorAndroid="transparent"
            onFocus={() => handleChange(true, 'nameFieldFocus')}
            onBlur={() => handleChange(false, 'nameFieldFocus')}
            onChangeText={text => handleChange(text, 'bankName')}
            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
        </View>
        <View style={{alignItems:'flex-end',marginTop:windowHeight/8}}>
      <TouchableOpacity 
    onPress={()=> pressButton()}
    style={[{
    height:moderateScale(48),width:moderateScale(48),
    bottom:32,
    justifyContent:'center',
    zIndex:1000,
    borderRadius:moderateScale(48)/2,
    backgroundColor:Colors.primary}]}>
     <Image source={Images.tick}
     resizeMode={'contain'}
      style={{alignSelf:'center',width:'100%',height:'100%'}}/>
    </TouchableOpacity>
        </View>
      </ScrollView>
      {/* <BottomAbsoluteButton image={Images.tick} onPress={() => pressButton()} /> */}
    </View>
  );
};

export default AddPayment;
