import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Button, SafeAreaView, FlatList, Text, Dimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/style.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getAnimeList} from '../services/api.js';
import {useDispatch, useSelector} from 'react-redux';
import {animeType} from '../utils/constant.js';
import allActions from '../redux/actions/index.js';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Card from '../components/animeCard';
import Ionicons from 'react-native-vector-icons/Ionicons';

const screenHeight = Dimensions.get('window').height;

const AiringScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [pageOffset, setPageOffset] = useState(1);
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const animeList = useSelector(state => state.catalogState.airingList);

  useEffect(() => {
    // initial 5 anime
    if (animeList && animeList.length < 1) {
      getData(pageOffset);
    }

    // console.log('check anime list', animeList);
  }, [animeList]);

  function btnPrssed() {
    navigation.openDrawer();
  }

  function getData(offset) {
    console.log('getData');

    setSpinnerVisible(true);

    getAnimeList(dispatch, offset, animeType.AIRING)
      .then(res => {
        if (res) {
          // console.log('check res here', res)
          dispatch(allActions.catalogActions.appendAiringList(res));
          // setSpinnerVisible(false);
        }
        setSpinnerVisible(false);
      })
      .catch(err => {
        // console.log('getPokemonList error', err);
        setSpinnerVisible(false);
      });
  }

  function onLoadMore() {
    console.log('load more');
    setPageOffset(pageOffset + 1);
  }
  
  function renderAnimeCard(item, index) {
    return <Card animeItem={item}></Card>;
  }

  useEffect(() => {
    if (pageOffset !== 1) {
      getData(pageOffset);
    }
  }, [pageOffset]);

  function openDrawer(){
    navigation.openDrawer()
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={globalStyles.headerLabel}>Airing Anime List</Text>

        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={()=>{openDrawer()}}>
            <Ionicons name="menu" style={styles.iconStyle} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{paddingHorizontal: 10}}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          initialNumToRender={5} // default 10
          data={animeList}
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

export default AiringScreen;
