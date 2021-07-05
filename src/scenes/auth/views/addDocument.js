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
import DateTimePicker from 'react-native-modal-datetime-picker';
import ImageChooser from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
let {padding, boxShadow, margin} = Mixins;
import {useDispatch, shallowEqual, useSelector} from 'react-redux';
import {Validation, Methods} from '_utils';

// Component
const AddDocument = ({navigation, route}) => {
  /****************************** Get Store State & Hooks*************************************/
  const dispatch = useDispatch()
  let accountHolderName, expFiled, typeField;
  const curDate = new Date();
  const [state, setState] = useState({...route.params.item,profileClick:false});
  const [isDateTimePickerVisible, showDateTimePicker] = useState(false);
  /****************************** Function Main  *************************************/
  const handleChange = (value, name) => {
    setState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  /****************************** Validation *************************************/
  const ValidationRules = () => {
    let {
      number = '',
      date = '',
      image = '',
      labelName,
      labelExp,
      type = '',
    } = state;
    const validArray = [
      {
        field: number,
        name: labelName,
        rules: 'required|no_space',
        lang: 'en',
      },
      {
        field: date,
        name: labelExp,
        rules: 'required',
        lang: 'en',
      },

      {
        field: image,
        name: 'Image',
        rules: 'required',
        lang: 'en',
      },
    ];
    if (state.type != 'licenceDetails') {
      validArray.push({
        field: type,
        name: 'Document type',
        rules: 'required|no_space',
        lang: 'en',
      });
    }
    return validArray;
  };
  /****************************** Api function *************************************/
  const pressButton = () => {
    let {number = '', date = '', image = '', type,mode,profileClick} = state;
    let validation = Validation.validate(ValidationRules());
    let {showToast} = Methods;
    if (validation.length != 0) {
      showToast(validation[0].message, 'danger');
    } else {
      const docData = new FormData();
      let {updateData, item} = route.params;
      let data ={}
      let ext = /[^.]+$/.exec(image.uri);
      data['number'] =number
      data['date'] =date
      data['type'] =type
      data['image'] ={
        uri:Platform.OS === 'android' ? image.uri : image.uri.replace('file://', ''),
        type: 'image/jpeg',
        name: `document.${ext}`,
      }
      updateData(item,data)
      navigation.goBack()
    }
  };
  const handleDatePicked = date => {
    showDateTimePicker(false);

    // console.log('A date has been picked: ', date);
    var datePicked = date.getDate();
    var month = date.getMonth() + 1;
    var day = date.getDay();
    var year = date.getFullYear();
    var monStr = '';
    switch (month) {
      case 1:
        monStr = 'Jan';
        break;
      case 2:
        monStr = 'Feb';
        break;
      case 3:
        monStr = 'Mar';
        break;
      case 4:
        monStr = 'Apr';
        break;
      case 5:
        monStr = 'May';
        break;
      case 6:
        monStr = 'Jun';
        break;
      case 7:
        monStr = 'Jul';
        break;
      case 8:
        monStr = 'Aug';
        break;
      case 9:
        monStr = 'Sep';
        break;
      case 10:
        monStr = 'Oct';
        break;
      case 11:
        monStr = 'Nov';
        break;
      case 12:
        monStr = 'Dec';
        break;
    }
    //console.log('A date has been picked: ', datePicked, monStr, year);
    var schDate = datePicked + '-' + monStr + '-' + year;
    setState(prevState => ({
      ...prevState,
      ['date']: schDate,
    }));
  };
  /***********************Upload license ****************/
  const uploadLicensePik = () => {
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
          ['image']: source,
          ['profileClick']:true
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
  /****************************** Render Main  *************************************/

  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('trasparent', {}, 0), padding(0)]}
        title={`${state.name}`}
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
          {/*************** Achhount Holder Name *******************/}
          <TextInput
            label={''}
            inputMenthod={input => {
              accountHolderName = input;
            }}
            placeholder={state.labelName}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            value={state.number}
            viewTextStyle={AppStyles.viewAddressTextStyle}
            underlineColorAndroid="transparent"
            onFocus={() => handleChange(true, 'nameFieldFocus')}
            onBlur={() => handleChange(false, 'nameFieldFocus')}
            onChangeText={text => handleChange(text, 'number')}
            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
          {/*************** Achhount Holder Name *******************/}
          <View style={{height: verticalScale(8)}} />
          <TextInput
            label={''}
            inputMenthod={input => {
              expFiled = input;
            }}
            placeholder={state.labelExp}
            placeholderTextColor="rgba(62,62,62,0.55)"
            returnKeyType="next"
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            blurOnSubmit={false}
            editable={false}
            value={state.date}
            onPress={() => showDateTimePicker(true)}
            onTouchStart={() => showDateTimePicker(true)}
            viewTextStyle={AppStyles.viewAddressTextStyle}
            underlineColorAndroid="transparent"
            onFocus={() => handleChange(true, 'expFieldFocus')}
            onBlur={() => handleChange(false, 'expFieldFocus')}
            onSubmitEditing={event => {
              Keyboard.dismiss();
            }}
          />
          {/*************** Achhount Holder Name *******************/}
          {state.type !== 'licenceDetails' ? (
            <>
              <View style={{height: verticalScale(8)}} />
              <TextInput
                label={''}
                inputMenthod={input => {
                  typeField = input;
                }}
                placeholder={'Type*'}
                placeholderTextColor="rgba(62,62,62,0.55)"
                returnKeyType="next"
                keyboardType="default"
                autoCorrect={false}
                autoCapitalize="none"
                blurOnSubmit={false}
                value={state.type}
                viewTextStyle={AppStyles.viewAddressTextStyle}
                underlineColorAndroid="transparent"
                onFocus={() => handleChange(true, 'typeFieldFocus')}
                onBlur={() => handleChange(false, 'typeFieldFocus')}
                onChangeText={text => handleChange(text, 'type')}
                onSubmitEditing={event => {
                  Keyboard.dismiss();
                }}
              />
            </>
          ) : null}

          <View style={{height: verticalScale(8)}} />

          <View
            style={{
              marginTop: moderateScale(8),
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: moderateScale(3),
                borderWidth: moderateScale(1),
                marginTop: moderateScale(10),
                borderStyle: 'dashed',
                flex: 0.25,
                justifyContent: 'center',
                alignItems: 'center',
                width: moderateScale(88),
                height: moderateScale(88),
                paddingVertical: 16,
              }}
              onPress={() => uploadLicensePik()}>
              {state.image ? (
                <Image
                  source={{uri: state.image && state.image.uri ? state.image.uri :''}}
                  style={{
                    width: moderateScale(88),
                    height: moderateScale(88),
                  }}
                />
              ) : (
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Image
                    source={Images.add}
                    style={{
                      height: moderateScale(24),
                      width: moderateScale(24),
                    }}
                  />
                  <Text
                    p
                    style={{
                      paddingTop: 11,
                      fontSize: Typography.normalize(10),
                    }}>
                    Upload Image
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{height: moderateScale(120)}} />

        <BottomAbsoluteButton 
        image={Images.tick} onPress={() => pressButton()} />
      </ScrollView>
      {isDateTimePickerVisible && (
        <DateTimePicker
          isVisible={isDateTimePickerVisible}
          onConfirm={handleDatePicked}
          onCancel={() => showDateTimePicker(false)}
          mode="date"
          date={state.date ?new Date(state.date) :new Date() }
          minimumDate={curDate}
        />
      )}
    </View>
  );
};

export default AddDocument;
