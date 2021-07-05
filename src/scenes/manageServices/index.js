
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import Services from './views/services';
import AddSession from './views/addSession';

const Stack = createStackNavigator();

// Setting Stack 
const ManageServicesStack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Services" component={Services} />
       <Stack.Screen name="AddSession" component={AddSession} />

  </Stack.Navigator>
}

export default ManageServicesStack;
