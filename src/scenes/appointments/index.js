
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

// Export all
import Chat from '../chat'
import Appointments from './views/appointments';
import AppointMentDetail from './views/appointmentDetail';
import Rating from './views/rating';
import ChemistList from './views/chemistList';

import { Typography, Colors, Mixins, AppStyles } from '_styles';
const { boxShadow } = Mixins
import {TabItem} from './templates'
import RefDetail from './views/refDetail';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

//Top Tabs
export const MyTopTabs = ({pastBooking,upcomingBooking,getAppointments}) => {
    return (
        <Tab.Navigator
            initialRouteName="Upcoming"
            tabBarOptions={{
                activeTintColor: Colors.black,
                inactiveTintColor: 'rgba(0,0,0,0.3)',
                indicatorStyle: {
                    backgroundColor: Colors.black,
                    height: moderateScale(2)
                },
                labelStyle: {
                    fontFamily: Typography.FONT_FAMILY_BOLD,
                    fontSize: Typography.normalize(18),
                    textTransform:'capitalize'

                },
                style: { backgroundColor: 'white', ...boxShadow('black') },
            }}
        >
            <Tab.Screen
                name="Upcoming"
                component={({navigation,route})=><TabItem 
                getAppointments={getAppointments}
                data={upcomingBooking} navigation={navigation} route={route}/>}
                options={{ tabBarLabel: 'Upcoming' }}
            />
            <Tab.Screen
                name="Past"
                component={({navigation,route})=><TabItem data={pastBooking}
                getAppointments={getAppointments}
                navigation={navigation} route={route}/>}
                options={{ tabBarLabel: 'Past' }}
            />
        </Tab.Navigator>
    );
}

// Setting Stack 
const AppointMentsStack = () => {
  return <Stack.Navigator headerMode={'none'}>
         <Stack.Screen name="Appointments" component={Appointments} />
         <Stack.Screen name="AppointMentDetail" component={AppointMentDetail} />
         <Stack.Screen name="Rating" component={Rating} />
         <Stack.Screen name="Chat" component={Chat} />
         <Stack.Screen name="ChemistList" component={ChemistList} />
         <Stack.Screen name="RefDetail" component={RefDetail} />

        </Stack.Navigator>
}

export default AppointMentsStack;
