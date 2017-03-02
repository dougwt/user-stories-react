import {
  FETCH_PROJECT_REQUEST,
  FETCH_PROJECT_SUCCESS,
  FETCH_PROJECT_FAILURE,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  all: [],
  all_isLoading: false,
  all_error: null,
  project: null,
  project_isLoading: false,
  project_error: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {

  case FETCH_PROJECT_REQUEST:
    return {
      ...state,
      project: null,
      project_isLoading: true,
      project_error: null
    };
  case FETCH_PROJECT_SUCCESS:
    return {
      ...state,
      project: action.payload.data.data,
      project_isLoading: false,
      project_error: null
    };
  case FETCH_PROJECT_FAILURE:
    return {
      ...state,
      project: null,
      project_isLoading: false,
      project_error: action.payload
    };

  case FETCH_PROJECTS_REQUEST:
    return {
      ...state,
      all: [],
      all_isLoading: true,
      all_error: null
    };
  case FETCH_PROJECTS_SUCCESS:
    return {
      ...state,
      all: action.payload.data.data,
      all_isLoading: false,
      all_error: null
    };
  case FETCH_PROJECTS_FAILURE:
    return {
      ...state,
      all: [],
      all_isLoading: false,
      all_error: action.payload
    };

  default:
    return state;
  }
}
