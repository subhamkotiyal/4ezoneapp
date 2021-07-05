import React from 'react';
import {View} from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import {Login,AddDocument,TermsCondition,Signup,ForgotPassword,VerifyOtp,ForgotEmail,Thankyou,AddressModal,Documents} from '_scenes/auth';

const Stack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="Login" component={Login} />

              <Stack.Screen name="Signup" component={Signup} />

        <Stack.Screen name="Thankyou" component={Thankyou} />
        <Stack.Screen name="ForgotEmail" component={ForgotEmail} />
    </Stack.Navigator>
  );
}
function DocumentsStack() {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Documents" component={Documents} />
      <Stack.Screen name="AddDocument" component={AddDocument} />

    </Stack.Navigator>
  );
}

function AuthNavigator() {
  return (
    <RootStack.Navigator mode="modal"  headerMode={'none'}>
      <RootStack.Screen
        name="MainAuth"
        component={MainStackScreen}
      />
      <RootStack.Screen name="VerifyOTP" component={VerifyOtp} />
      <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <RootStack.Screen name="AddressModal" component={AddressModal} />
      <RootStack.Screen name="DocumentsStack" component={DocumentsStack} />
      <RootStack.Screen name="TermsCondition" component={TermsCondition} />

    </RootStack.Navigator>
  );
}
export default AuthNavigator;