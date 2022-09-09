import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AiringScreen from '../screens/AiringScreen';
import CompletedScreen from '../screens/CompletedScreen';
import UpcomingScreen from '../screens/UpcomingScreen';


const Tab = createBottomTabNavigator();

const TabNavigator = () => {

    return(
        <Tab.Navigator screenOptions={{ 
            headerShown: false,
            tabBarLabelStyle: { fontSize: 20 },
            tabBarIconStyle: { display: "none" },
          }}>
        <Tab.Screen name='Airing' component={AiringScreen}></Tab.Screen>
        <Tab.Screen name='Completed' component={CompletedScreen}></Tab.Screen>
        <Tab.Screen name='Upcoming' component={UpcomingScreen}></Tab.Screen>
    </Tab.Navigator>
    )
  
}

export default TabNavigator;