import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Text, Button, Header} from '_atoms';
import {ListEmptyComponent, BottomAbsoluteButton} from '_molecules';
import {useDispatch, useSelector} from 'react-redux';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Images} from '_utils';
import {Typography, Colors, Mixins, AppStyles} from '_styles';
import {TrainerItem} from '../templates';
import {
  getTrainerRequest,
  deleteTrainerRequest,
} from '../../../store/modules/trainers/actions';
let {boxShadow, padding} = Mixins;

// Component
const Trainers = ({navigation}) => {
  const dispatch = useDispatch();
  const {trainers = [], user} = useSelector(state => ({
    trainers: state.trainerReducer.trainers,
    user: state.getProfileReducer.profileData,
  }));
  useEffect(() => {
    getGymTrainer();
  }, []);
  /****************************** Api Function *************************************/
  const getGymTrainer = () => {
    let {_id} = user;
    let data = {
      _id: _id,
    };
    dispatch(getTrainerRequest(data));
  };
  const deleteGymTrainer = item => {
    let {_id} = user;
    let data = {
      _id: _id,
      trainerId: item._id,
    };
    dispatch(deleteTrainerRequest(data));
  };
  const deletAction = item => {
    Alert.alert(
      'Alert!',
      'Are you sure you want to delete this trainer?',
      [
        {text: 'Ok', onPress: () => deleteGymTrainer(item)},
        {text: 'Cancel', onPress: () => console.log('OK Pressed')},
      ],
      {cancelable: false},
    );
  };

  /****************************** Render Main  *************************************/
  return (
    <View style={[{flex: 1, backgroundColor: Colors.white}]}>
      <Header
        leftText
        image={Images.hamburger}
        onPressLeft={() => navigation.openDrawer()}
        style={[boxShadow('trasparent', {}, 0)]}
        title={'Add Trainer'}
        textStyle={{textAlign: 'center'}}
      />
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.white,
          paddingTop: scale(16),
        }}>
        <FlatList
          data={trainers}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <ListEmptyComponent message={'No trainers found!'} />
          )}
          renderItem={({item, index}) => (
            <TrainerItem
              item={item}
              index={index}
              deletAction={() => deletAction(item)}
              onPress={() => null}
            />
          )}
          style={{backgroundColor: Colors.white}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => 'store' + index}
        />
      </View>
      <BottomAbsoluteButton
        image={Images.add}
        onPress={() => navigation.navigate('AddTrainer')}
      />
    </View>
  );
};

export default Trainers;
