
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import Dispute from './views/dispute';
import Claim from './views/claim';
import Reply from './views/reply';

const Stack = createStackNavigator();

// Setting Stack 
const Disputestack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Dispute" component={Dispute} />
       <Stack.Screen name="Claim" component={Claim} />
       <Stack.Screen name="Reply" component={Reply} />

  </Stack.Navigator>
}

export default Disputestack;
