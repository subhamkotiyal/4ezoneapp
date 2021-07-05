
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Export all
import Chat from './views/chat';

const Stack = createStackNavigator();

// Setting Stack 
const ChatStack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Chat" component={Chat} />

  </Stack.Navigator>
}

export default ChatStack;
