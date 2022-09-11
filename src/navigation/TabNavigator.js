import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AiringScreen from '../screens/AiringScreen';
import CompletedScreen from '../screens/CompletedScreen';
import UpcomingScreen from '../screens/UpcomingScreen';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: '#0E0E23'},
        tabBarLabelStyle: {fontSize: 20},
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: '#fff',
        tabBarIconStyle: {display: 'none'},
        tabBarActiveBackgroundColor: '#0E0E23',
        tabBarInactiveBackgroundColor: '#0E0E23'
      }}>
      <Tab.Screen name="Airing" component={AiringScreen}></Tab.Screen>
      <Tab.Screen name="Completed" component={CompletedScreen}></Tab.Screen>
      <Tab.Screen name="Upcoming" component={UpcomingScreen}></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabNavigator;
