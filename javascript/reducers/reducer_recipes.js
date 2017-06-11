import _ from 'lodash';
import { FETCH_RECIPES, FETCH_RECIPE } from '../actions/index';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_RECIPES:
			return _.mapKeys(action.payload.data, 'slug');
		case FETCH_RECIPE:
			//turn the object into an array so that we can get the first (and only) item
			const recipe = _.map(action.payload.data)[0];
			 //do not manipulate the state (eg. state.push(), return a NEW array
			return {...state, [recipe.slug]: recipe };
	}
	return state;
}
