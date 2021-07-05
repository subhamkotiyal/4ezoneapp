import React from 'react';
import { View, Image } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import {CustomDrawer} from '_atoms'
import HomeStack from '_scenes/home';
import AppointMentsStack from '_scenes/appointments';
import TrainersStack from '_scenes/trainers';
import ManageServicesStack from '_scenes/manageServices';
import DisputeStack from '_scenes/dispute';
import ProfileStack from '_scenes/profile';
import EarningsStack from '_scenes/earnings';
// import ContactStack from '_scenes/contact';
import ReferStack from '_scenes/referFriend';
import PaymentsStack from '_scenes/payments';
import SupportsStack from '_scenes/supports';

const Drawer = createDrawerNavigator();
function AppNavigator() {
  return <Drawer.Navigator
  drawerType="front"
  initialRouteName="Home"
  drawerContent={(props) => <CustomDrawer {...props} />}>
  <Drawer.Screen name="Home" component={HomeStack} />
  <Drawer.Screen name="Appointments" component={AppointMentsStack}/>
  <Drawer.Screen name="ReferFriend" component={ReferStack}/>
  <Drawer.Screen name="Trainers" component={TrainersStack}/>
  <Drawer.Screen name="Payments" component={PaymentsStack}/>
  <Drawer.Screen name="Earnings" component={EarningsStack}/>
  <Drawer.Screen name="Services" component={ManageServicesStack}/>
  <Drawer.Screen name="Dispute" component={DisputeStack}/>
  <Drawer.Screen name="Profile" component={ProfileStack}/>
  <Drawer.Screen name="Support" component={SupportsStack} />

  </Drawer.Navigator>
}

export default AppNavigator;