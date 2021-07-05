import React, { useState, useRef, useEffect, } from 'react';
import { View, TouchableOpacity, FlatList, ScrollView, Keyboard } from 'react-native';
import { Text, Button, Header } from '_atoms'
import { ListEmptyComponent,BottomAbsoluteButton} from '_molecules'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Images } from '_utils'
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { TrainerItem } from '../../trainers/templates';
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import {
  getTrainerRequest,
} from '../../../store/modules/trainers/actions'
import { addAcceptRejectgRequest } from '../../../store/modules/requests/actions';
import Config from '_utils/constants/apiConstant';
import {  Methods } from '_utils'

let { boxShadow, padding } = Mixins


// Component 
const SelectTrainer = ({ navigation,route }) => {
/****************************** Store Function *************************************/
  const dispatch = useDispatch()
  const { trainers=[],user } = useSelector(state => ({
    trainers: state.trainerReducer.trainers,
    user: state.getProfileReducer.profileData,
  }));
  const [gymTrainers, setTrainers] = useState(trainers);
  useEffect(() => {
    getGymTrainer()
  }, [])

/****************************** Api Function *************************************/
  const getGymTrainer = () => {
    let {_id} = user
    let data={
     _id:_id
    }
    dispatch(getTrainerRequest(data))
 }
 const pressButton = () =>{
   let assignTrainer=gymTrainers.filter(x=> x.isSelect)
   let { showToast } = Methods
   if(assignTrainer && assignTrainer.length > 0){
    let data ={}
    let apiName = Config.gymAssignTrainer
    let getRequests = `${Config.gymcurrentRequest}${user._id}`
     data['trainerId'] = assignTrainer[0]._id
     data['bookingId'] = route.params.bookingId
    dispatch(addAcceptRejectgRequest(apiName,data,navigation,getRequests))
   }else{
    showToast('Please select trainer', 'danger')
   }
 }

 const onSelectTrainer= (item) =>{
  const objArray = [...gymTrainers];
  let objIndex = objArray.findIndex(x => x._id == item._id);
  if (objIndex > -1) {
    const updatedObj = {...objArray[objIndex], isSelect: !item.isSelect};
    const updatedSessionData = [
      ...objArray.slice(0, objIndex),
      updatedObj,
      ...objArray.slice(objIndex + 1),
    ];
    setTrainers(updatedSessionData);
  }
 }
 
/****************************** Render Main  *************************************/
  return <View style={[{ flex: 1, backgroundColor: Colors.white }]}>
    <Header
      leftText
      image={Images.back}
      onPressLeft={()=> navigation.goBack()}
      style={[boxShadow('trasparent', {}, 0)]}
      title={'Select Trainer'}
      textStyle={{ textAlign: 'center' }}
    />
      <View style={{ 
        flex:1,backgroundColor: Colors.white,paddingTop:scale(16)}}>
          <FlatList
            data={gymTrainers}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={()=> <ListEmptyComponent message={'No tour plans found!'}/>}
            renderItem={({item,index}) => <TrainerItem 
              item={item}
              index={index}
              isAssignTrainer
              isSelectTrainer
              onPress={()=>onSelectTrainer(item)}
            />}
            style={{backgroundColor: Colors.white}}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => 'store' + index}
          />
        </View>

        {/************   Submit Button   *****************/}
         <View style={{
            justifyContent: 'center',
            paddingHorizontal:moderateScale(32),
            flex: 0.2
        }}>
        <Button onPress={() => pressButton()}
        title={'Submit'} />
        </View>
  </View>
}

export default SelectTrainer;