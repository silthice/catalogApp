export const getAnimeList = async (dispatch, offset, type) => {
  const url = `https://api.jikan.moe/v4/top/anime?limit=5&page=${offset}&filter=${type}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(json => {
      return json.data;
    })
    .catch(err => {
      console.log('get animet list err', err);
    });
};

export const getAnimeDetail = async (dispatch, id) => {
  const url = `https://api.jikan.moe/v4/anime/${id}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(json => {
      return json.data;
    })
    .catch(err => {
      console.log('get anime detail err', err);
    });
};

export const searchAnimeList = async (dispatch, offset, type, searchText) => {
  const url = `https://api.jikan.moe/v4/anime?page=${offset}&limit=5&filter=${type}&q=${searchText}`;

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(json => {
      return json.data;
    })
    .catch(err => {
      console.log('get animet list err', err);
    });
};
