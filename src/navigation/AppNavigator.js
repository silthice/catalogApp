import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import rootReducer from '../redux/reducers/index';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import DrawerNavigator from './DrawerNavigator';
import AnimeDetailScreen from '../screens/AnimeDetailScreen';

const Stack = createNativeStackNavigator();
const store = createStore(rootReducer);

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
