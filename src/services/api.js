export const getAnimeList = async (dispatch, offset, type) => {
  // const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;

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
      //   console.log('check json here', json)
      return json.data;
    })
    .catch(err => {
      console.log('get animet list err', err);
    });
};

export const getAnimeDetail = async (dispatch, id) => {
  // const url = `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`;

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
      // console.log('check json here', json)
      return json.data;
    })
    .catch(err => {
      console.log('get anime detail err', err);
    });
};

const asyncLoop = async (dispatch, newPokemonList) => {
  const allResults = [];

  for (const pokemon of newPokemonList) {
    const eachPokemonResult = await getPokemonPartialDetail(dispatch, pokemon);
    allResults.push(eachPokemonResult);
  }
  return allResults;
};
