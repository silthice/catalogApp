const INITIAL_STATE = {
  airingList: [],
  completedList: [],
  upcomingList: [],
  favouriteList: []
};

const catalog = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'APPEND_AIRING_LIST':
      return {
        ...state,
        airingList: [...state.airingList, ...action.payload]
      };
    case 'APPEND_COMPLETED_LIST':
      return {
        ...state,
        completedList: [...state.completedList, ...action.payload]
      };
    case 'APPEND_UPCOMING_LIST':
      return {
        ...state,
        upcomingList: [...state.upcomingList, ...action.payload]
      };

    case 'RESET_ANIME_LIST':
      return {
        ...state,
        upcomingList: [],
        completedList: [],
        airingList: []
      };
    case 'APPEND_FAVOURITE_LIST':
      return {
        ...state,
        favouriteList: [...state.favouriteList, ...action.payload]
      };

    case 'SET_FAVOURITE_LIST':
      return {
        ...state,
        favouriteList: action.payload
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
