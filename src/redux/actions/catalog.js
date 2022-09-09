const appendFavouriteList = newFavouriteList => {
  return {
    type: 'APPEND_FAVOURITE_LIST',
    payload: newFavouriteList
  };
};

const resetFavouriteList = () => {
  return {
    type: 'RESET_FAVOURITE_LIST'
  };
};

const appendAnimeList = newAnimeList => {
  console.log('check append', newAnimeList)
  return {
    type: 'APPEND_ANIME_LIST',
    payload: newAnimeList
  };
};

const resetAnimeList = () => {
  return {
    type: 'RESET_ANIME_LIST'
  };
};

export default {
  appendFavouriteList,
  resetFavouriteList,
  appendAnimeList,
  resetAnimeList
};
