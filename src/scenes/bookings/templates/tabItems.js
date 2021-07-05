import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, FlatList, ImageBackground, Keyboard } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { ListEmptyComponent} from '_molecules'

import  BookingItem  from './bookingItem';
let { boxShadow, padding, windowWidth, windowHeight } = Mixins


export default  TabItem = ({ navigation,route,data }) => {
  console.log(data,"routerouterouteroute")
return <FlatList
data={data}
showsVerticalScrollIndicator={false}
ListEmptyComponent={()=> <ListEmptyComponent message={'No booking found!'}/>}
renderItem={({item,index}) => <BookingItem 
  item={item}
  index={index}
  onPress={() => navigation.navigate('BookingDetail',{
    from :route.name,
    itemDetail:item
  })}
/>}
style={{backgroundColor: Colors.white}}
showsHorizontalScrollIndicator={false}
keyExtractor={(item, index) => 'store' + index}
/>
}