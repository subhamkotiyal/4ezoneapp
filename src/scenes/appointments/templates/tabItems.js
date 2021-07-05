import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ImageBackground,
  Keyboard,
} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {ListEmptyComponent} from '_molecules';

import AppointmentItem from './appointmentItem';
let {boxShadow, padding, windowWidth, windowHeight} = Mixins;

export default TabItem = ({navigation, route, data,getAppointments}) => {
  console.log(data, 'routerouterouteroute');
  const [refreshing, setRefreshing] = useState(false);

  const onRefreshList = ()=>{
     getAppointments()
  }
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      refreshing={refreshing}
      onRefresh={() => onRefreshList()}
      ListEmptyComponent={() => (
        <ListEmptyComponent message={'No appointments found!'} />
      )}
      renderItem={({item, index}) => (
        <AppointmentItem
          item={item}
          index={index}
          onPress={() =>
            navigation.navigate('AppointMentDetail', {
              from: route.name,
              itemDetail: item,
              getAppointments:()=>getAppointments()
            })
          }
        />
      )}
      style={{backgroundColor: Colors.white}}
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item, index) => 'store' + index}
    />
  );
};
