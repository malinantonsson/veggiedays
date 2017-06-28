import axios from 'axios';
const ROOT_URL = 'https://veggiedays-1b98e.firebaseio.com/recipes';
const EXT = '.json'

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const CREATE_RECIPE = 'CREATE_RECIPE';
export const EDIT_RECIPE = 'EDIT_RECIPE';
export const FETCH_RECIPE = 'FETCH_RECIPE';

export function fetchRecipes(term) {
	const request = axios.get(`${ROOT_URL}${EXT}`);
	console.log('term');
  return {
    type: FETCH_RECIPES,
    payload: request
  }
}

export function fetchLastThreeRecipes() {
	const request = axios.get(`${ROOT_URL}${EXT}?orderBy="date"&limitToLast=3`);

  return {
    type: FETCH_RECIPES,
    payload: request
  }
}

export function fetchRecipe(slug) {
	const request = axios.get(`${ROOT_URL}${EXT}?orderBy="slug"&equalTo="${slug}"&limitToFirst=1`);

	return {
		type: FETCH_RECIPE,
		payload: request
	};
}

export function createRecipe(values, callback) {
	const request = axios.post(`${ROOT_URL}${EXT}`, values)
		.then(() => callback());

	return {
		type: CREATE_RECIPE,
		payload: request
	};
}

export function editRecipe(key, values, callback) {
	const request = axios.patch(`${ROOT_URL}/${key}${EXT}`, values)
	 	.then(() => callback());

	return {
		type: EDIT_RECIPE,
		payload: request
	};
}
