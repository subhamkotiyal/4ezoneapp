
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Typography, Colors, Mixins, AppStyles } from '_styles';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const { boxShadow } = Mixins
// Export all
import Earnings from './views/earnings';
import TabItem  from './views/tabItem'
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

//Top Tabs
export const MyTopTabs = ({dayWebView,weekWebView}) => {
    return (
        <Tab.Navigator
            initialRouteName="Day"
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
                name="Day"
                component={({navigation,route})=><TabItem
                earningWebview={()=>dayWebView()} navigation={navigation} route={route}/>}
                options={{ tabBarLabel: 'Day' }}
            />
            <Tab.Screen
                name="Past"
                component={({navigation,route})=><TabItem 
                earningWebview={()=>weekWebView()}
                 navigation={navigation} route={route}/>}
                options={{ tabBarLabel: 'Week' }}
            />
        </Tab.Navigator>
    );
}
// Setting Stack 
const EarningsStack = () => {
  return <Stack.Navigator headerMode={'none'}>
       <Stack.Screen name="Earnings" component={Earnings} />

  </Stack.Navigator>
}

export default EarningsStack;
