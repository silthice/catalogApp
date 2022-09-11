import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Text,
  Dimensions
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/style.js';
import Card from '../components/animeCard';
import {useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('window').height;

const FavouriteScreen = () => {
  const navigation = useNavigation();
  const favouriteList = useSelector(state => state.catalogState.favouriteList);
  const isFocus = useIsFocused();
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  useEffect(() => {
    if (isFocus === true) {
      console.log('useeffect check', favouriteList);
      setSpinnerVisible(true);
      setSpinnerVisible(false);
    }
  }, [favouriteList, isFocus]);

  function renderAnimeCard(item, index) {
    return <Card animeItem={item}></Card>;
  }

  function openDrawer() {
    navigation.openDrawer();
  }

  function renderEmptyList() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          height: screenHeight * 0.8
        }}>
        <Text style={{color: '#fff'}}>Add more anime to favourite list !</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={globalStyles.headerLabel}>Favourite List</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              openDrawer();
            }}>
            <Ionicons name="menu" style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          data={favouriteList}
          ListEmptyComponent={renderEmptyList}
          renderItem={({item, index}) => renderAnimeCard(item, index)}
        />
      </View>
      <Spinner visible={spinnerVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E23',
    paddingHorizontal: 10
  },
  headerContainer: {
    height: screenHeight * 0.035,
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1
  },
  iconStyle: {
    fontSize: 25,
    color: '#F5F5F5'
  }
});

export default FavouriteScreen;
