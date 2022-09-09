import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Button, SafeAreaView} from 'react-native';
import React from 'react';
import {globalStyles} from '../utils/style.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const MainScreen = () => {
  const navigation = useNavigation();

  function btnPrssed () {
    navigation.openDrawer();
  }

  return <SafeAreaView style={styles.container}>

    <View><Button title='touch' onPress={btnPrssed}></Button></View>
  </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default MainScreen;
