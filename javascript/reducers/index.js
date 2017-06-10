import { combineReducers } from 'redux';
import RecipesReducer from './reducer_recipes';

const rootReducer = combineReducers({
  weather: RecipesReducer
});

export default rootReducer;
