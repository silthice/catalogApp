import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View, Button, SafeAreaView, FlatList, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/style.js';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getAnimeList, getAnimeDetail} from '../services/api.js';
import {useDispatch, useSelector} from 'react-redux';
import {animeType} from '../utils/constant.js';
import allActions from '../redux/actions/index.js';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const AnimeDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [spinnerVisible, setSpinnerVisible] = useState(false);

  console.log('route', route.params.item.mal_id)

  useEffect(()=>{
    getData()
  }, [])

  function getData() {
    console.log('getData');

    setSpinnerVisible(true)

    getAnimeDetail(dispatch, route.params.item.mal_id)
    .then(res => {
      if (res) {
        console.log('check res here', res)
        // dispatch(allActions.catalogActions.appendAiringList(res));
        // setSpinnerVisible(false);
      }
      setSpinnerVisible(false);
    })
    .catch(err => {
      // console.log('getPokemonList error', err);
      setSpinnerVisible(false);
    });
  }

  function goBack(){
    navigation.goBack()
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{}}>
        <Button title='touch' onPress={goBack}></Button>
      </View>
      <Spinner visible={spinnerVisible} />

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E23',
    // alignItems: 'center',
    // justifyContent: 'center'
  }
});

export default AnimeDetailScreen;
