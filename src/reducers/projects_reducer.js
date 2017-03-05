import * as types from '../actions/types';

const INITIAL_STATE = {
  all: [],
  all_isLoading: false,
  all_error: null,
  project: null,
  project_isLoading: false,
  project_error: null,
  role_isPosting: false,
  role_error: null
};

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case types.FETCH_PROJECT: {
    return {
      ...state,
      project: null,
      project_isLoading: true,
      project_error: null
    };
  }
  case types.FETCH_PROJECT_SUCCESS: {
    return {
      ...state,
      project: action.payload.data.data,
      project_isLoading: false,
      project_error: null
    };
  }
  case types.FETCH_PROJECT_FAILURE: {
    return {
      ...state,
      project: null,
      project_isLoading: false,
      project_error: action.payload
    };
  }
  case types.FETCH_PROJECTS: {
    return {
      ...state,
      all: [],
      all_isLoading: true,
      all_error: null
    };
  }
  case types.FETCH_PROJECTS_SUCCESS: {
    return {
      ...state,
      all: action.payload.data.data,
      all_isLoading: false,
      all_error: null
    };
  }
  case types.FETCH_PROJECTS_FAILURE: {
    return {
      ...state,
      all: [],
      all_isLoading: false,
      all_error: action.payload
    };
  }
  case types.CREATE_ROLE: {
    return  {
      ...state,
      role_isPosting: true,
      role_error: null
    };
  }
  case types.CREATE_ROLE_SUCCESS: {
    return {
      ...state,
      project: {
        ...state.project,
        roles: action.payload.data.data
      },
      role_isPosting: false,
      role_error: null
    };
  }
  case types.CREATE_ROLE_FAILURE: {
    return {
      ...state,
      role_isPosting: false,
      role_error: action.payload
    };
  }

  case types.DELETE_ROLE: {
    const { project } = state;

    return {
      ...state,
      project: {
        ...state.project,
        // Remove the role
        roles: project.roles.filter((e, i) => project.roles[i]._id !== action.payload.roleId)
      }
    };
  }

  default: {
    return state;
  }
  }
}
