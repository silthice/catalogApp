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
import DrawerNavigator from './DrawerNavigator';
import AnimeDetailScreen from '../screens/AnimeDetailScreen';
const Drawer = createDrawerNavigator();

export default function NavigationStack() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerBackTitleVisible: false, headerShown: false}}>
          <Stack.Screen name="MainScreen" component={DrawerNavigator} />
          <Stack.Screen name="AnimeDetailScreen" component={AnimeDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// export default function NavigationStack() {
//   return (
//     <Provider store={store}>
//       <NavigationContainer>
//         <Drawer.Navigator
//           screenOptions={{
//             headerBackTitleVisible: false,
//             headerShown: false,
//             drawerActiveBackgroundColor: 'red',
//             drawerActiveTintColor: '#fff',
//             drawerLabelStyle: {
//               marginLeft: -15
//             },
//             swipeEnabled: true
//           }}>
//           <Drawer.Screen
//             name="MainScreen"
//             component={TabNavigator}
//             options={{
//               drawerIcon: ({color}) => <MaterialIcons name="home" size={30} color={color} />
//             }}
//           />

//           <Drawer.Screen
//             name="FavouriteScreen"
//             component={FavouriteScreen}
//             options={{
//               drawerIcon: ({color}) => <MaterialIcons name="favorite" size={30} color={color} />
//             }}
//           />
//         </Drawer.Navigator>
//       </NavigationContainer>
//     </Provider>
//   );
// }
