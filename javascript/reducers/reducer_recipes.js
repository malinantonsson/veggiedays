import _ from 'lodash';
import { FETCH_RECIPES, FETCH_RECIPE } from '../actions/index';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_RECIPES:
			return [action.payload.data, ...state]; //do not manipulate the state (eg. state.push(), return a NEW array
		case FETCH_RECIPE:
			console.log(_.mapKeys(action.payload.data, 'slug'));
			return _.mapKeys(action.payload.data, 'slug');
	}
	return state;
}
