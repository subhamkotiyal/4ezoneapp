import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, FlatList, ScrollView, Keyboard } from 'react-native';
import { Text, Button, Header } from '_atoms'
import { ListEmptyComponent,BottomAbsoluteButton} from '_molecules'
import {useDispatch, shallowEqual, useSelector} from 'react-redux';

import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { PaymentsItem } from '../templates';

let { boxShadow, padding } = Mixins


// Component 
const Payments = ({ navigation }) => {
  const {user={}} = useSelector(state => ({
    user: state.getProfileReducer.profileData,
  }));
/****************************** Function Main  *************************************/
const editPress = (item) =>{
  navigation.navigate('AddPayment',{
    itemDetail:item
  })
}
/****************************** Render Main  *************************************/
  return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
         <Header
      leftText
      image={Images.hamburger}
      onPressLeft={()=> navigation.openDrawer()}
      style={[boxShadow('trasparent', {}, 0)]}
      title={'Payment Details'}
      textStyle={{ textAlign: 'center' }}
    />
      <View style={{ 
        flex:1,backgroundColor: Colors.white,paddingTop:scale(12)}}>
          <FlatList
            data={user && user.accountDetails ? [user.accountDetails]:[]}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={()=> <ListEmptyComponent message={'No data found!'}/>}
            renderItem={({item,index}) => <PaymentsItem 
              item={item}
              index={index}
              onRightPress={() => editPress(item)}
            />}
            style={{backgroundColor: Colors.white}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => 'store' + index}
          />
        </View>
        {user && !user.accountDetails && <BottomAbsoluteButton image={Images.add}
         onPress={()=> navigation.navigate('AddPayment')}
        /> }
       
  </View>
}

export default Payments;