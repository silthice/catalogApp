import {useNavigation} from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Button,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../utils/style.js';
import {getAnimeList, getAnimeDetail} from '../services/api.js';
import {useDispatch, useSelector} from 'react-redux';
import {animeType} from '../utils/constant.js';
import allActions from '../redux/actions/index.js';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AnimeDetailScreen = ({route}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [spinnerVisible, setSpinnerVisible] = useState(false);
  const [animeDetails, setAnimeDetails] = useState(null);
  const [tabIndex, setTabIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const favouriteList = useSelector(state => state.catalogState.favouriteList);

  const animeTitle = route.params.item.title;
  const animeImg = route.params.item.images.jpg.image_url;
  const animeId = route.params.item.mal_id;

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log('useeffect check favourite list', favouriteList);

    // if (favouriteList && favouriteList.length > 0) {
    const found = favouriteList.find(element => element.mal_id == animeId);
    if (found) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
    // }
  }, [favouriteList]);

  function getData() {
    console.log('getData');

    setSpinnerVisible(true);

    getAnimeDetail(dispatch, animeId)
      .then(res => {
        if (res) {
          // console.log('check res here', res);
          setAnimeDetails(res);
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

  function goBack() {
    console.log('pressed');
    navigation.goBack();
  }

  function getTabStyle(val) {
    return {
      color: val == tabIndex ? '#fff' : 'lightgrey',
      fontSize: val == tabIndex ? 20 : 18,
      fontWeight: val == tabIndex ? 'bold' : 'normal'
    };
  }

  function renderUnderline(val) {
    return (
      <View
        style={{
          height: tabIndex == val ? 3 : 0,
          width: 100,
          borderRadius: 5,
          marginTop: 5,
          backgroundColor: '#fff'
        }}></View>
    );
  }

  function renderTopSection() {
    return (
      <View style={styles.topSection}>
        <View style={styles.imageContainer}>
          <ImageBackground
            borderRadius={7.5}
            style={styles.image}
            source={{uri: animeImg}}></ImageBackground>
        </View>
        <View style={styles.detailsContainer}>
          <View style={globalStyles.flexDirectionRow}>
            <View style={{flex: 1.3}}>
              <Text style={styles.generalLabel}>SCORE</Text>
              {renderValue('score')}
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.generalLabel}>RANK</Text>
              {renderValue('rank')}
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.generalLabel}>POPULARITY</Text>
              {renderValue('popularity')}
            </View>
          </View>

          <View style={{marginVertical: 10}}></View>
          <View style={globalStyles.flexDirectionRow}>
            <View style={{flex: 1.3}}>
              <Text style={styles.generalLabel}>PREMERIED</Text>
              {renderValue('season')}
              {animeDetails && animeDetails.year && renderValue('year')}
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.generalLabel}>TYPE</Text>
              {renderValue('type')}
            </View>

            <View style={{flex: 1}}>
              <Text style={styles.generalLabel}>EPISODES</Text>
              {renderValue('episodes')}
            </View>
          </View>

          <View style={{marginVertical: 5}}></View>
          <View style={globalStyles.flexDirectionRow}>
            <View style={{flex: 1}}>
              <Text style={styles.generalLabel}>RATING</Text>
              {renderValue('rating')}
            </View>
          </View>

          <View style={{marginVertical: 5}}></View>
          <View style={globalStyles.flexDirectionRow}>
            <View style={{flex: 1}}>
              <Text style={styles.generalLabel}>STATUS</Text>
              {renderValue('status')}
            </View>
          </View>
        </View>
      </View>
    );
  }

  function renderContent() {
    if (tabIndex == 1) {
      return renderOtherDetails();
    }

    return renderSynopsis();
  }

  function renderOtherDetails() {
    return (
      <View>
        <View style={styles.otherLabel}>
          <Text style={[styles.generalValue, {width: 130}]}>Genres</Text>
          <View style={{marginLeft: 30, flex: 1}}>{renderValue('genre')}</View>
        </View>

        <View style={styles.otherLabel}>
          <Text style={[styles.generalValue, {width: 130}]}>Demographics</Text>
          <View style={{marginLeft: 30, flex: 1}}>{renderValue('demographics')}</View>
        </View>

        <View style={styles.otherLabel}>
          <Text style={[styles.generalValue, {width: 130}]}>Studio</Text>
          <View style={{marginLeft: 30, flex: 1}}>{renderValue('studio')}</View>
        </View>

        <View style={styles.otherLabel}>
          <Text style={[styles.generalValue, {width: 130}]}>Aired</Text>
          <View style={{marginLeft: 30, flex: 1}}>{renderValue('aired')}</View>
        </View>
      </View>
    );
  }

  function renderSynopsis() {
    return <ScrollView>{renderValue('synopsis')}</ScrollView>;
  }

  function renderBottomSection() {
    return (
      <View style={styles.bottomSection}>
        <View style={{height: 40, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => setTabIndex(0)}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={getTabStyle(0)}>Synopsis</Text>
            {renderUnderline(0)}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTabIndex(1)}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={getTabStyle(1)}>Others</Text>
            {renderUnderline(1)}
          </TouchableOpacity>
        </View>
        <View style={{flex: 1, padding: 5, paddingTop: 15}}>{renderContent()}</View>
      </View>
    );
  }

  function renderValue(val) {
    if (!animeDetails) {
      return null;
    }

    if (val == 'type' && animeDetails.type) {
      return <Text style={styles.generalValue}>{animeDetails.type}</Text>;
    }

    if (val == 'year' && animeDetails.year) {
      return <Text style={styles.generalValue}>{animeDetails.year}</Text>;
    }

    if (val == 'season' && animeDetails.season) {
      return (
        <Text style={[styles.generalValue, {textTransform: 'capitalize'}]}>
          {animeDetails.season}
        </Text>
      );
    }

    if (val == 'episodes' && animeDetails.episodes) {
      return <Text style={styles.generalValue}>{animeDetails.episodes}</Text>;
    }

    if (val == 'popularity' && animeDetails.popularity) {
      return <Text style={[styles.generalValue, {fontSize: 20}]}>#{animeDetails.popularity}</Text>;
    }

    if (val == 'score' && animeDetails.score) {
      return <Text style={[styles.generalValue, {fontSize: 20}]}>{animeDetails.score}</Text>;
    }

    if (val == 'rank' && animeDetails.rank) {
      return <Text style={[styles.generalValue, {fontSize: 20}]}>#{animeDetails.rank}</Text>;
    }

    if (val == 'rating' && animeDetails.rating) {
      return <Text style={[styles.generalValue, {}]}>{animeDetails.rating}</Text>;
    }

    if (val == 'status' && animeDetails.status) {
      return <Text style={[styles.generalValue, {}]}>{animeDetails.status}</Text>;
    }

    if (val == 'synopsis') {
      return <Text style={[styles.generalValue, {}]}>{animeDetails.synopsis}</Text>;
    }

    if (val == 'aired') {
      return <Text style={[styles.generalValue, {}]}>{animeDetails.aired.string}</Text>;
    }

    if (val == 'genre') {
      let genres = animeDetails.genres;

      if (genres.length > 0) {
        let value = '';

        genres.forEach((genre, index) => {
          value = value + (index == 0 ? '' : ', ') + genre.name;
        });
        return <Text style={[styles.generalValue, {}]}>{value}</Text>;
      }
    }

    if (val == 'studio') {
      let studio = animeDetails.studios;
      if (studio.length > 0) {
        let value = '';

        studio.forEach((studio, index) => {
          value = value + (index == 0 ? '' : ', ') + studio.name;
        });
        return <Text style={[styles.generalValue, {}]}>{value}</Text>;
      }
    }

    if (val == 'demographics') {
      let demographics = animeDetails.demographics;

      if (demographics.length > 0) {
        let value = '';

        demographics.forEach((demographic, index) => {
          value = value + (index == 0 ? '' : ', ') + demographic.name;
        });
        return <Text style={[styles.generalValue, {}]}>{value}</Text>;
      }
    }

    return <Text style={styles.generalValue}>-</Text>;
  }

  function favDidPressed() {
    // setIsFavorite(!isFavorite);
    // dispatch(allActions.catalogActions.appendFavouriteList([animeDetails]));

    if (isFavorite) {
      return dispatch(
        allActions.catalogActions.setFavouriteList(
          favouriteList.filter(anime => anime.mal_id !== animeId)
        )
      );
    }

    return dispatch(allActions.catalogActions.appendFavouriteList([animeDetails]));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBarContainer}>
        <TouchableOpacity style={styles.button} onPress={() => goBack()}>
          <Ionicons name="arrow-back" style={styles.iconStyle} />
        </TouchableOpacity>
        <View style={styles.topLabelContainer}>
          <Text style={styles.topLabel}>Details</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => favDidPressed()}>
          <MaterialIcons name="favorite" size={25} color={isFavorite ? 'red' : '#fff'} />
        </TouchableOpacity>
      </View>

      <View style={{height: undefined, paddingHorizontal: 15, marginBottom: 15}}>
        <Text numberOfLines={2} style={styles.titleLabel}>
          {animeTitle}
        </Text>
      </View>

      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={{uri: animeImg}}
        imageStyle={{opacity: 0.2}}
        blurRadius={2}>
        <View style={{flex: 1}}>
          {renderTopSection()}
          <View style={{marginVertical: 5}}></View>
          {renderBottomSection()}
        </View>
      </ImageBackground>

      <Spinner visible={spinnerVisible} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E0E23'
  },
  topLabelContainer: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  topBarContainer: {
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10
  },
  topLabel: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  button: {
    width: 30,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconStyle: {
    fontSize: 25,
    color: '#F5F5F5'
  },
  imageBackground: {
    flex: 1,
    padding: 10
  },
  titleLabel: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold'
  },
  topSection: {
    height: 200,
    flexDirection: 'row'
  },
  imageContainer: {
    height: '100%',
    width: '35%'
  },
  image: {
    height: '100%',
    width: '100%'
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 15
  },
  generalLabel: {
    fontSize: 11,
    color: 'lightgrey'
  },
  generalValue: {
    fontWeight: 'bold',
    color: '#fff'
  },
  bottomSection: {
    flex: 1
  },
  otherLabel: {
    flexDirection: 'row',
    marginBottom: 15
  }
});
export default AnimeDetailScreen;
