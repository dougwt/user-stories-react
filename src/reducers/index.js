import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import ProjectsReducer from './reducer_projects'

const rootReducer = combineReducers({
  projects: ProjectsReducer,
  form: formReducer
})

export default rootReducer;
