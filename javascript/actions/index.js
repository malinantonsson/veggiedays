import axios from 'axios';
const ROOT_URL = 'https://veggiedays-1b98e.firebaseio.com/recipes.json';

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const CREATE_RECIPE = 'CREATE_RECIPE';

export function fetchRecipes(term) {
	//finish the request url
	const request = axios.get(`${ROOT_URL}`);

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

	return {
		type: CREATE_RECIPE,
		payload: request
	};
}
