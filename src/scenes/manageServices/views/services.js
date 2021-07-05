import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, FlatList, ScrollView, Keyboard } from 'react-native';
import { Text, Button, Header } from '_atoms'
import { ListEmptyComponent,BottomAbsoluteButton} from '_molecules'
import { useDispatch, useSelector } from "react-redux";

import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import {ManageServiceItem} from '../templates';

let { boxShadow, padding } = Mixins
import {
  getSessionRequest
} from '../../../store/modules/sessions/actions'
import Config, { SUCCESS } from '_utils/constants/apiConstant';

// Component 
const ManageServices = ({ navigation }) => {

  const dispatch = useDispatch()
  const { sessions=[],user } = useSelector(state => ({
    sessions: state.sessionsReducer.sessions,
    user: state.getProfileReducer.profileData,

  }));
  useEffect(() => {
    getSession()
  }, [])
/****************************** Api Function *************************************/
  const getSession = () => {
     let {_id} = user
     if(user && user.role == 'trainer'){
      dispatch(getSessionRequest(`${Config.getTrainerSessions}${_id}`))
     }else{
      dispatch(getSessionRequest(`${Config.getGymSessions}${_id}`))
     }
  }
  const onPressEdit = (item) =>{
    navigation.navigate('AddSession',{
        itemDetail:item,
        mode:'update'
    })
  }
/****************************** Render Main  *************************************/
  return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
    <Header
      leftText
      image={Images.hamburger}
      onPressLeft={()=> navigation.openDrawer()}
      style={[boxShadow('trasparent', {}, 0)]}
      title={'Manage Services'}
      textStyle={{ textAlign: 'center' }}
    />
      <View style={{ 
        flex:1,backgroundColor: Colors.white,paddingTop:scale(16)}}>
          <FlatList
            data={sessions}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={()=> <ListEmptyComponent message={'No sessions found!'}/>}
            renderItem={({item,index}) => <ManageServiceItem 
              item={item}
              index={index}
              onPressEdit={()=> onPressEdit(item)}
              onPress={() => null}
            />}
            style={{backgroundColor: Colors.white}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => 'store' + index}
          />
        </View>
        <BottomAbsoluteButton image={Images.add}
         onPress={()=> navigation.navigate('AddSession',{
          mode:'add'
         })}
        />

  </View>
}

export default ManageServices;