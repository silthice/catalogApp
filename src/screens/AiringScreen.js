import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Button, SafeAreaView, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/style.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getAnimeList} from '../services/api.js';
import {useDispatch, useSelector} from 'react-redux';
import {animeType} from '../utils/constant.js';
import allActions from '../redux/actions/index.js';

const AiringScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [pageOffset, setPageOffset] = useState(1);
  const animeList = useSelector(state => state.catalogState.animeList);

  useEffect(() => {
    // initial 5 anime
    if (animeList && animeList.length < 1) {
      getData(pageOffset);
    }

    console.log('check anime list', animeList);
  }, [animeList]);

  function btnPrssed() {
    navigation.openDrawer();
  }

  function getData(offset) {
    console.log('getData');

    getAnimeList(dispatch, offset, animeType.AIRING)
      .then(res => {
        if (res) {
          // console.log('check res here', res)
          dispatch(allActions.catalogActions.appendAnimeList(res));
          // setSpinnerVisible(false);
        }
        // setSpinnerVisible(false);
      })
      .catch(err => {
        // console.log('getPokemonList error', err);
        // setSpinnerVisible(false);
      });
  }

  function onLoadMore() {
    console.log('load more');
    setPageOffset(pageOffset + 1);
  }

  function renderAnimeCard(item) {
    console.log('check item here', item.title);
    return (
      <View style={{height: 500, backgroundColor: 'red'}}>
        <Text>{item.title}</Text>
      </View>
    );
  }


  useEffect(() => {
    if (pageOffset !== 1) {
      getData(pageOffset);
    }
  }, [pageOffset]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default AiringScreen;
