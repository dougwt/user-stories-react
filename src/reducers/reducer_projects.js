import {
  FETCH_PROJECT,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  all: [],
  project: null,
  isLoading: false,
  error: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_PROJECT:
    return { ...state, project: action.payload.data.data };
  case FETCH_PROJECTS_REQUEST:
    return { ...state, isLoading: true, error: null };
  case FETCH_PROJECTS_SUCCESS:
    return {
      ...state,
      all: action.payload.data.data,
      isLoading: false,
      error: null
    };
  case FETCH_PROJECTS_FAILURE:
    return { ...state, isLoading: false, error: action.payload };
  default:
    return state;
  }
}
