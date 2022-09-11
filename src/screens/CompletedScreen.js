import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Text,
  Dimensions,
  TextInput,
  Alert
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/style.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getAnimeList, searchAnimeList} from '../services/api.js';
import {useDispatch, useSelector} from 'react-redux';
import {animeType} from '../utils/constant.js';
import allActions from '../redux/actions/index.js';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Card from '../components/animeCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('window').height;

const CompletedScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [pageOffset, setPageOffset] = useState(1);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [searchText, setSearchText] = useState(null);
  const animeList = useSelector(state => state.catalogState.completedList);

  useEffect(() => {
    // initial 5 anime
    if (animeList && animeList.length < 1) {
      getData(pageOffset, searchText);
    }
  }, [animeList]);

  function getData(offset, searchText) {
    console.log('getData', offset, searchText);

    setSpinnerVisible(true);

    if (searchText == null) {
      getAnimeList(dispatch, offset, animeType.COMPLETED)
        .then(res => {
          if (res) {
            dispatch(allActions.catalogActions.appendCompletedList(res));
          }
          setSpinnerVisible(false);
        })
        .catch(err => {
          console.log('search anime error', err);
          setSpinnerVisible(false);
        });
    } else {
      searchAnimeList(dispatch, offset, animeType.COMPLETED, searchText)
        .then(res => {
          if (res) {
            dispatch(allActions.catalogActions.appendCompletedList(res));
          }
          setSpinnerVisible(false);
        })
        .catch(err => {
          console.log('search anime error', err);
          setSpinnerVisible(false);
        });
    }
  }

  function onLoadMore() {
    console.log('load more');
    setPageOffset(pageOffset + 1);
  }

  function renderAnimeCard(item, index) {
    return (
      <View style={{marginBottom: index === animeList.length - 1 ? screenHeight * 0.115 : 0}}>
        <Card animeItem={item}></Card>
      </View>
    );
  }

  useEffect(() => {
    if (pageOffset !== 1) {
      getData(pageOffset, searchText);
    }
  }, [pageOffset]);

  function openDrawer() {
    navigation.openDrawer();
  }

  function searchAnime() {
    if (searchText === '' || searchText === null) {
      Alert.alert('cannot empty');
      return;
    }
    setPageOffset(1);
    dispatch(allActions.catalogActions.resetCompletedList());
  }

  function clearSearch() {
    setPageOffset(1);
    setSearchText(null);
    dispatch(allActions.catalogActions.resetCompletedList());
  }

  function renderClearButton() {
    if (searchText) {
      return (
        <TouchableOpacity
          onPress={() => {
            clearSearch();
          }}>
          <Ionicons name="close" style={styles.clearIconStyle} />
        </TouchableOpacity>
      );
    }
    return null;
  }

  function renderEmptyList() {
    if (!spinnerVisible && pageOffset === 1) {
      return (
        <View
          style={{
            flex: 1,
            marginTop: screenHeight * 0.425,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
          <Text style={{color: '#fff'}}>Opps, no anime(s) found with the keyword.</Text>
          <Text style={{color: '#fff', marginTop: 5}}>
            Please try again to search with another keyword.
          </Text>
        </View>
      );
    }

    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={globalStyles.headerLabel}>Completed Anime List</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => {
              openDrawer();
            }}>
            <Ionicons name="menu" style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.searchBarContainer}>
        <Ionicons name="search" style={styles.searchIconStyle} />
        <TextInput
          style={styles.searchTextContainer}
          placeholder={'Search Anime'}
          placeholderTextColor={'#c5c5c5'}
          returnKeyType={'search'}
          onChangeText={val => {
            setSearchText(val);
          }}
          value={searchText === '' || searchText === null ? '' : searchText}
          onSubmitEditing={() => {
            searchAnime();
          }}
        />
        {renderClearButton()}
      </View>
      <View style={{paddingHorizontal: 10}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5} // default 10
          data={animeList}
          ListEmptyComponent={renderEmptyList}
          renderItem={({item, index}) => renderAnimeCard(item, index)}
          onEndReached={() => {
            onLoadMore();
          }}
          onEndReachedThreshold={0}
        />
      </View>
      <Spinner visible={spinnerVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E23'
  },
  headerContainer: {
    height: 40,
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
  },
  searchIconStyle: {
    fontSize: 25,
    color: '#c5c5c5'
  },
  clearIconStyle: {
    fontSize: 25,
    color: '#c5c5c5'
  },
  searchTextContainer: {
    flex: 1,
    color: '#fff',
    marginLeft: 10
  },
  searchBarContainer: {
    marginTop: 15,
    height: 40,
    backgroundColor: 'grey',
    marginHorizontal: 25,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  }
});

export default CompletedScreen;
