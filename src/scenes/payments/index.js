
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import Payments from './views/payments';
import AddPayment from './views/addPayment';

const Stack = createStackNavigator();

// Setting Stack 
const Paymentstack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Payments" component={Payments} />
       <Stack.Screen name="AddPayment" component={AddPayment} />

  </Stack.Navigator>
}

export default Paymentstack;
