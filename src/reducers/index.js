import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth_reducer';
import projectsReducer from './projects_reducer';

const rootReducer = combineReducers({
  auth: authReducer,
  form: formReducer,
  projects: projectsReducer
});

export default rootReducer;
