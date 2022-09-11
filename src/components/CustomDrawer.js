import React from 'react';
import {StyleSheet, View, Text, SafeAreaView, Dimensions} from 'react-native';
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';

const screenHeight = Dimensions.get('window').height;

const CustomDrawer = props => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#192b34'}}>
      <View style={styles.headerContainer}>
        <Text style={styles.appLabel}>Anime App</Text>

        <View style={styles.underline}></View>
      </View>
      <View style={styles.drawerContainer}>
          <DrawerItemList {...props}></DrawerItemList>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15,
    height: 60
  },
  appLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  underline: {
    borderWidth: 1,
    width: '100%',
    borderColor: '#fff',
    marginVertical: 20
  },
  drawerContainer: {
    flex: 1,
    marginTop: 5
  }
});

export default CustomDrawer;
