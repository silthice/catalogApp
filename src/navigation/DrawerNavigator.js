import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import rootReducer from '../redux/reducers/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
const Stack = createNativeStackNavigator();
const store = createStore(rootReducer);

import {createDrawerNavigator} from '@react-navigation/drawer';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TabNavigator from './TabNavigator';
import FavouriteScreen from '../screens/FavouriteScreen';
import CustomDrawer from '../components/CustomDrawer';
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContent={props => <CustomDrawer {...props}/>}
      screenOptions={{
        headerBackTitleVisible: false,
        headerShown: false,
        drawerActiveBackgroundColor: 'red',
        drawerActiveTintColor: '#fff',
        drawerInactiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -15
        }, 
        swipeEnabled: true
      }}>
      <Drawer.Screen
        name="Anime List"
        component={TabNavigator}
        options={{
          drawerIcon: ({color}) => <MaterialIcons name="home" size={30} color={color} />
        }}
      />

      <Drawer.Screen
        name="Favourite List"
        component={FavouriteScreen}
        options={{
          drawerIcon: ({color}) => <MaterialIcons name="favorite" size={30} color={color} />
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
