import _ from 'lodash';
import { FETCH_RECIPES, FETCH_RECIPE } from '../actions/index';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_RECIPES:
			return _.mapKeys(action.payload.data, 'slug');

		case FETCH_RECIPE:
			if(action.payload.data) {
				//get the firebaseKey from the object key
				const firebaseKey = Object.getOwnPropertyNames(action.payload.data)[0];
				//turn the object into an array so that we can get the first (and only) item
				const recipe = _.map(action.payload.data)[0];
				recipe.firebaseKey = firebaseKey;
				 //do not manipulate the state (eg. state.push(), return a NEW array
				return {...state, [recipe.slug]: recipe };
			}
			return state;

	}
	return state;
}
