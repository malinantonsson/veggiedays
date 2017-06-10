import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import RecipesReducer from './reducer_recipes';

const rootReducer = combineReducers({
  recipes: RecipesReducer, //gets all the recipies
  form: formReducer
});

export default rootReducer;
