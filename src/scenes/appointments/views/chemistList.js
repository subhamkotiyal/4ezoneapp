import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  PermissionsAndroid,
  Keyboard,
  Platform,
} from 'react-native';
import {Text, Header} from '_atoms';
import {useDispatch, useSelector} from 'react-redux';
import {ListEmptyComponent} from '_molecules';

import {getBookingRequest} from '../../../store/modules/booking/actions';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {MyTopTabs} from '../';
import Config from '_utils/constants/apiConstant';
import RefListItem from '../templates/refListItem';
import {getNearbyChemistRequest} from '../../../store/modules/chemists/actions';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyCS6VfhaV6MNwtOHaXfBJY0ntUs34YUhaA');
let {boxShadow, padding} = Mixins;

// Component
const ChemistList = ({navigation, route}) => {
  /****************************** Hooks and store function *************************************/
  let {itemDetail, title} = route.params;
  const dispatch = useDispatch();
  const [locations, setLocationState] = useState({
    sourceLocation: '',
    curLatitude: '',
    curLongitude: '',
  });
  const {nearbyChemist = [], profileData = {}} = useSelector(state => ({
    nearbyChemist: state.chemistsReducer.nearbyChemist,
    profileData: state.getProfileReducer.profileData,
  }));
  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    } else {
      getCurrentLocation();
    }
  }, []);

  /****************************** Location Function *************************************/
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '',
          message: 'Allow to access current location',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
        //console.log('You can use the location');
      } else {
        //console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const getCurrentLocation = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        setLocationState(prevState => ({
          ...prevState,
          curLatitude: position.coords.latitude,
          curLongitude: position.coords.longitude,
        }));
        debugger;
        getNearbyChemist(position.coords.latitude, position.coords.longitude);
      },
      error => {
        alert(error.message);
        setLocationState(prevState => ({
          ...prevState,
          error: error.message,
        }));
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 10000,
      },
    );
  };
  /****************************** Api Function *************************************/
  const getNearbyChemist = (curLatitude, curLongitude) => {
    let data = {
      startLocation: {
        lat: curLatitude,
        lng: curLongitude,
 
      },
    };
    const requestName = checkRefFrom();
    dispatch(getNearbyChemistRequest(requestName, data, cbFxn));
  };

  // Check ref from user
  const checkRefFrom = () => {
    let apiName;
    switch (title) {
      case 'Pharmacy':
        apiName = Config.chemistNearby;
        break;
      case 'Lab':
        apiName = Config.labNearby;
        break;
      case 'Hospital':
        apiName = Config.hospitalNearby;
        break; 
      case 'Doctors':
        apiName = Config.doctorNearby;
        break;
      default:
    }
    return apiName;
  };

  const cbFxn = () => {};
  /****************************** Render Main  *************************************/

  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.back}
        onPressLeft={() => navigation.goBack()}
        style={[boxShadow('black', {}, 1)]}
        title={title}
        textStyle={{textAlign: 'center'}}
      />
      <View
        style={{
          flex: 1,
          paddingTop: scale(2, 8),
        }}>
        <FlatList
          data={nearbyChemist}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmptyComponent message={'No Data found!'} />
          )}
          renderItem={({item, index}) => (
            <RefListItem
              item={item}
              index={index}
              onPress={() =>
                navigation.navigate('RefDetail', {
                  itemDetail: item,
                  orderId: itemDetail._id,
                  title: title,
                })
              }
            />
          )}
          style={{backgroundColor: Colors.white}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => 'store' + index}
        />
      </View>
    </View>
  );
};

export default ChemistList;
