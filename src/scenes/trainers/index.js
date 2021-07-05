
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import { Typography, Colors, Mixins, AppStyles } from '_styles';

// Export all
import Trainers from './views/trainers';
import AddTrainer from './views/addTrainer';
import AddressModal from '../auth/views/addressModal'
const Stack = createStackNavigator();
const RootStack =  createStackNavigator();

// Setting Stack 
const MainStackScreen = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Trainers" component={Trainers} />
       <Stack.Screen name="AddTrainer" component={AddTrainer} />
  </Stack.Navigator>
}
function TrainerStack() {
  return ( <>
    <StatusBar barStyle="dark-content" backgroundColor={Colors.transparent} />
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: Colors.white }]}>
      <RootStack.Navigator mode="modal"  headerMode={'none'}>
      <RootStack.Screen
        name="MainTrainer"
        component={MainStackScreen}
      />
      <RootStack.Screen name="AddressModal" component={AddressModal} />
    </RootStack.Navigator>
    </SafeAreaView>
  </>
  );
}
export default TrainerStack;


