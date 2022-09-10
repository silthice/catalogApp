import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {Card} from 'react-native-elements';
import {globalStyles} from '../utils/style';

const CardComponent = props => {
  const navigation = useNavigation();
  // Items should have image, name, rating, score and year
  console.log('check item here', props.animeItem.title);
  console.log('check item here', props.animeItem.images.jpg.image_url);
  console.log('check item here', props.animeItem.rating);
  console.log('check item here', props.animeItem.score);
  console.log('check item here', props.animeItem.year);

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
    <TouchableOpacity onPress={viewAnimeDetail}>
      <Card containerStyle={styles.cardContainerStyle} wrapperStyle={styles.containerWrapperStyle}>
        {/* <View style={styles.cardContainerStyle}> */}
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: animeImg
            }}
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
              <Text style={styles.year}>{animeYear ? animeYear : 'To Be Confirmed'}</Text>
            </View>

            <View style={globalStyles.flexDirectionRow}>
              <Text style={styles.label}>Rank: </Text>
              <Text style={styles.rank}>{animeRank ? animeRank : 'To Be Confirmed'}</Text>
            </View>

            <View style={globalStyles.flexDirectionRow}>
              <Text style={styles.label}>Rating: </Text>
              <Text style={styles.rating}>{animeRating ? animeRating : 'To Be Confirmed'}</Text>
            </View>

            <View style={globalStyles.flexDirectionRow}>
              <Text style={styles.label}>Score: </Text>
              {animeScore ? (
                <View style={globalStyles.flexDirectionRow}>
                  <Text style={styles.score}>{animeScore}</Text>
                  <Text> / 10</Text>
                </View>
              ) : (
                <Text>To Be Confirmed</Text>
              )}
            </View>
          </View>
        </View>
        {/* </View> */}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainerStyle: {
    borderRadius: 5,
    height: 160,
    padding: 0
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
  otherDetailsContainer: {},
  image: {
    height: '90%',
    width: '90%',
    borderRadius: 5
  },
  detailStyle: {
    width: '70%',
    padding: 10,
    paddingHorizontal: 5
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  rating: {
    marginBottom: 5
  },
  score: {
    marginBottom: 5
  },
  year: {
    marginBottom: 5
  },
  rank: {
    marginBottom: 5
  },
  label: {
      fontWeight: 'bold'
  }
});

export default CardComponent;
