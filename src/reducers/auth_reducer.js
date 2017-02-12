import { AUTH_SIGNIN, AUTH_SIGNOUT, AUTH_ERROR } from '../actions'

export default function(state = { }, action) {
  switch(action.type) {
  case AUTH_SIGNIN:
    return { ...state, authenticated: true, error: '' };
  case AUTH_SIGNOUT:
    return { ...state, authenticated: false, error: '' };
  case AUTH_ERROR:
    return { ...state, error: action.payload };
  default:
    return state;
  }
}
