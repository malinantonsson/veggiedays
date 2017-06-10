import axios from 'axios';
// Weather api key
const API_KEY = '5d3dfc26f533ce64c9ac9b240327bd9a';
//const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`;
const ROOT_URL = 'https://veggiedays-1b98e.firebaseio.com/recipes.json';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const CREATE_RECIPE = 'CREATE_RECIPE';

export function fetchRecipes(term) {
	//finish the request url
	const request = axios.get(`${ROOT_URL}?orderBy="date"&limitToLast=3`);

  return {
    type: FETCH_RECIPES,
    payload: request
  }
}

export function fetchLastThreeRecipes() {
	//finish the request url
	const request = axios.get(`${ROOT_URL}?orderBy="date"&limitToLast=3`);

  return {
    type: FETCH_RECIPES,
    payload: request
  }
}

export function createRecipe(values, callback) {
	const request = axios.post(`${ROOT_URL}`, values)
		.then(() => callback());
		//console.log(values);

	return {
		type: CREATE_RECIPE,
		payload: request
	};
}
