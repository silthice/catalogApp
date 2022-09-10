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

const appendAiringList = newAnimeList => {
  return {
    type: 'APPEND_AIRING_LIST',
    payload: newAnimeList
  };
};

const appendCompletedList = newAnimeList => {
  return {
    type: 'APPEND_COMPLETED_LIST',
    payload: newAnimeList
  };
};

const appendUpcomingList = newAnimeList => {
  return {
    type: 'APPEND_UPCOMING_LIST',
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
  appendAiringList,
  appendCompletedList,
  appendUpcomingList,
  resetAnimeList
};
