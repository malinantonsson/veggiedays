import axios from 'axios';
// Weather api key
const API_KEY = '5d3dfc26f533ce64c9ac9b240327bd9a';
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;

export const FETCH_RECIPES = 'FETCH_RECIPES';

export function fetchRecipes(term) {
	//finish the request url
	const url = `${ROOT_URL}&q=${term},uk`;
	const request = axios.get(url);

  return {
    type: FETCH_RECIPES,
    payload: request
  }
}
