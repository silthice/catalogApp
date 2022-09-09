const INITIAL_STATE = {
    animeList: [], favouriteList: []
  };
  
  const catalog = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case 'APPEND_ANIME_LIST':
        return {
          ...state,
          animeList: [...state.animeList, ...action.payload]
        };
  
      case 'RESET_ANIME_LIST':
        return {
          ...state,
          animeList: []
        };
      case 'APPEND_FAVOURITE_LIST':
        return {
          ...state,
          favouriteList: [...state.favouriteList, ...action.payload]
        };
  
      case 'RESET_FAVOURITE_LIST':
        return {
          ...state,
          favouriteList: []
        };
  
      default:
        return state;
    }
  };
  
  export default catalog;
  