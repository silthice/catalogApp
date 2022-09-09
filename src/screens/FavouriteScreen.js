import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Button, SafeAreaView} from 'react-native';
import React from 'react';
import {globalStyles} from '../utils/style.js';

const FavouriteScreen = () => {
  const navigation = useNavigation();

  return <SafeAreaView style={styles.container}></SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contactUsButton: {
    backgroundColor: 'lightgrey',
    borderRadius: 10
  }
});

export default FavouriteScreen;
