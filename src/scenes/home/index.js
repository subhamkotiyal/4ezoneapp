
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import Home from './views/home';
import RequestDetail from './views/requestDetail';
import SelectTrainer from './views/selectTrainer';

const Stack = createStackNavigator();

// Setting Stack 
const HomeStack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Home" component={Home} />
       <Stack.Screen name="RequestDetail" component={RequestDetail} />
       <Stack.Screen name="SelectTrainer" component={SelectTrainer} />

  </Stack.Navigator>
}

export default HomeStack;
