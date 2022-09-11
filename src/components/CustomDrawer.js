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
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props}></DrawerItemList>
        </DrawerContentScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 15
  },
  appLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  underline:{
      borderWidth: 1,
      width: '100%',
      borderColor: '#fff',
      marginVertical: 15
  },
  drawerContainer: {
    flex: 1,
     marginTop: -screenHeight * 0.055
  }
});

export default CustomDrawer;
