import { FETCH_PROJECTS } from '../actions/index'

const INITIAL_STATE = { all: [], project: null };

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
  case FETCH_PROJECTS:
    return { ...state, all: action.payload.data.data };
  default:
    return state;
  }
}
