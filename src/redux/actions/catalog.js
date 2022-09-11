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

const setFavouriteList = newFavList => {
  return {
    type: 'SET_FAVOURITE_LIST',
    payload: newFavList
  };
};

const resetUpcomingList = () => {
  return {
    type: 'RESET_UPCOMING_LIST'
  };
};

const resetCompletedList = () => {
  return {
    type: 'RESET_COMPLETED_LIST'
  };
};

const resetAiringList = () => {
  return {
    type: 'RESET_AIRING_LIST'
  };
};

export default {
  appendFavouriteList,
  resetFavouriteList,
  appendAiringList,
  appendCompletedList,
  appendUpcomingList,
  setFavouriteList,
  resetAiringList,
  resetCompletedList,
  resetUpcomingList,
  resetFavouriteList
};
