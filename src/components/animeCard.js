import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-elements';
import {globalStyles} from '../utils/style';

const CardComponent = props => {
  const navigation = useNavigation();
  // Items should have image, name, rating, score and year

  const animeTitle = props.animeItem.title;
  const animeImg = props.animeItem.images.jpg.image_url;
  const animeRating = props.animeItem.rating;
  const animeScore = props.animeItem.score;
  const animeYear = props.animeItem.year;
  const animeRank = props.animeItem.rank;

  function viewAnimeDetail() {
    navigation.navigate('AnimeDetailScreen', {item: props.animeItem});
  }

  return (
    <Card containerStyle={styles.cardContainerStyle} wrapperStyle={styles.containerWrapperStyle}>
      <TouchableOpacity
        style={[styles.cardContainerStyle, styles.containerWrapperStyle]}
        onPress={viewAnimeDetail}>
        {/* <View style={styles.cardContainerStyle}> */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: animeImg
            }}
            defaultSource={require('../assets/default-img.jpg')}
          />
        </View>
        <View style={styles.detailStyle}>
          <View style={styles.titleContainer}>
            <Text numberOfLines={2} style={styles.title}>
              {animeTitle}
            </Text>
          </View>
          <View style={styles.otherDetailsContainer}>
            <View style={globalStyles.flexDirectionRow}>
              <Text style={styles.label}>Year: </Text>
              <Text style={styles.year}>{animeYear || 'TBC'}</Text>
            </View>

            <View style={globalStyles.flexDirectionRow}>
              <Text style={styles.label}>Rank: </Text>
              <Text style={styles.rank}>{animeRank || 'TBC'}</Text>
            </View>

            <View style={[globalStyles.flexDirectionRow, {width: '85%'}]}>
              <Text style={styles.label}>Rating: </Text>
              <Text numberOfLines={1} style={styles.rating}>{animeRating || 'TBC'}</Text>
            </View>

            <View style={globalStyles.flexDirectionRow}>
              <Text style={styles.label}>Score: </Text>
              {animeScore ? (
                <View style={globalStyles.flexDirectionRow}>
                  <Text style={styles.score}>{animeScore}</Text>
                  <Text style={styles.score}> / 10</Text>
                </View>
              ) : (
                <Text style={styles.score}> TBC</Text>
              )}
            </View>
          </View>
        </View>
        {/* </View> */}
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    borderRadius: 5,
    height: 160,
    padding: 0,
    backgroundColor: '#192b34',
    borderWidth: 0,
    marginBottom: 10
  },
  containerWrapperStyle: {
    flexDirection: 'row',
    height: '100%'
  },
  imageContainer: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleContainer: {
    height: 50
  },
  otherDetailsContainer: {
    marginTop: 5,
  },
  image: {
    height: 160,
    width: '90%',
    borderRadius: 5
  },
  detailStyle: {
    width: '70%',
    padding: 5,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff'
  },
  rating: {
    marginBottom: 5,
    color: '#fff'
  },
  score: {
    marginBottom: 5,
    color: '#fff'
  },
  year: {
    marginBottom: 5,
    color: '#fff'
  },
  rank: {
    marginBottom: 5,
    color: '#fff'
  },
  label: {
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default CardComponent;
