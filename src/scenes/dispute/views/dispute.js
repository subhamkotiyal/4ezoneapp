import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Text, Button, Header} from '_atoms';
import {ListEmptyComponent} from '_molecules';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import { useDispatch, useSelector } from "react-redux";
import Config from '_utils/constants/apiConstant';

import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {DisputeItem} from '../templates';
import {
  getDisputeRequest
} from '../../../store/modules/dispute/actions'
let {boxShadow, padding} = Mixins;

// Component
const Dispute = ({navigation}) => {
  const dispatch = useDispatch();
  const {inProcessDispute = [],profileData={}} = useSelector(state => ({
    profileData: state.getProfileReducer.profileData,
    inProcessDispute: state.disputeReducer.inProcessDispute,
  }));
  useEffect(() => {
    getDispute();
  }, []);
 /****************************** Api Function *************************************/
 const getDispute = () => {
   if(profileData){
    let {role} = profileData
    let apiName
    if(role =='trainer'){
      apiName = `${Config.getUpcomingDisputeTrainer}`
    }else if(role =='gym'){
      apiName = `${Config.getUpcomingDisputeGym}`
    }
    dispatch(getDisputeRequest(apiName))
   }

}
  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.hamburger}
        onPressLeft={() => navigation.openDrawer()}
        style={[boxShadow('trasparent', {}, 0)]}
        title={'Claim List'}
        textStyle={{textAlign: 'center'}}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingTop: scale(12),
        }}>
        <FlatList
          data={inProcessDispute}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmptyComponent message={'No claim list found!'} />
          )}
          renderItem={({item, index}) => (
            <DisputeItem
              item={item}
              index={index}
              onPress={() => navigation.navigate('Claim',{
                itemDetail:item
              })}
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

export default Dispute;
